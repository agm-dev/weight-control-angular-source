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

  addWeightForm = new FormGroup({
    amount: new FormControl(undefined, Validators.required),
    date: new FormControl('15/05/2019'),
  });

  constructor(
    private logger:LoggerService,
    private state:StateService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    const data = this.addWeightForm.value;
    this.logger.warn('addWeighForm submit event', data);

    // TODO: check date, to set to now if not valid value provided

    this.state.addWeight(data);
    this.state.save();
  }

}
