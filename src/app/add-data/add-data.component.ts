import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../logger.service';
import { StateService } from '../state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit, OnDestroy {

  private sub;
  private today:string;
  addWeightForm:FormGroup;
  public stateMessage:string;
  public type:string;
  public buttonText:string;
  public initialDateText:string;
  public initialAmountText:string;

  constructor(
    private route: ActivatedRoute,
    private logger:LoggerService,
    private state:StateService
  ) {
  }

  generateDefaultDate() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toJSON().slice(0, 10);
  }

  protected configure(type:string) {
    const isGoal = type === 'goal';
    this.type = type;
    this.initialDateText = isGoal ? 'Starting date' : 'Date';
    this.initialAmountText = isGoal ? 'Starting weight' : 'Add weight';
    this.buttonText = isGoal ? 'Set' : 'Add';
  }

  protected initForm(type:string) {
    if (type === 'add') {
      this.addWeightForm = new FormGroup({
        amount: new FormControl(undefined, Validators.required),
        date: new FormControl(this.today),
      });
    } else if (type === 'goal') {
      this.addWeightForm = new FormGroup({
        amount: new FormControl(undefined, Validators.required),
        date: new FormControl(this.today),
        targetAmount: new FormControl(undefined, Validators.required),
        targetDate: new FormControl(this.today),
      });
    }
  }

  ngOnInit() {
    this.today = this.generateDefaultDate();
    this.stateMessage = '';

    this.sub = this.route
      .data
      .subscribe(data => {
        this.logger.log('route data', data);
        this.configure(data.type);
        this.initForm(this.type);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    const data = this.addWeightForm.value;
    this.logger.warn('addWeighForm submit event', data);

    // TODO: check date, to set to now if not valid value provided

    const isGoal = this.type === 'goal';
    this.stateMessage = isGoal ? 'Setting new goal...' : 'Adding new weight...';

    if (isGoal) {
      this.state.setGoal(
        { date: data.date, amount: data.amount },
        { date: data.targetDate, amount: data.targetAmount },
      );
    } else {
      this.state.addWeight(data);
    }
    this.state.save();

    this.addWeightForm.reset();
    const formValue = isGoal ? { date: this.today, amount: '', targetDate: this.today, targetAmount: '' } : { date: this.today, amount: '' };
    this.addWeightForm.setValue(formValue);
    this.stateMessage = isGoal ? 'Set new goal!' : 'Added new weight!';
  }

}
