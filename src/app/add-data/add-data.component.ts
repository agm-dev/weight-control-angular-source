import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../logger.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  private today:string;
  addWeightForm:FormGroup;
  public stateMessage:string;

  constructor(
    private logger:LoggerService,
    private state:StateService
  ) {
    this.today = this.generateDefaultDate();
    this.addWeightForm = new FormGroup({
      amount: new FormControl(undefined, Validators.required),
      date: new FormControl(this.today),
    });
    this.stateMessage = '';
  }

  generateDefaultDate() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toJSON().slice(0, 10);
  }

  ngOnInit() {
  }

  onSubmit() {
    const data = this.addWeightForm.value;
    this.logger.warn('addWeighForm submit event', data);

    // TODO: check date, to set to now if not valid value provided

    this.stateMessage = 'Adding new weight...';
    this.state.addWeight(data);
    this.state.save();
    this.addWeightForm.reset();
    this.addWeightForm.setValue({ date: this.today, amount: '' });
    this.stateMessage = 'Added new weight!';
  }

}
