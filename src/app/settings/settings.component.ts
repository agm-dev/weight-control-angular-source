import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  public clearDataMessage:string;

  constructor(
    private state:StateService
  ) {
    this.clearDataMessage = '';
  }

  onClickClearData() {
    this.state.clear();
    this.clearDataMessage = 'All the data has been removed';
  }

  ngOnInit() {
  }

}
