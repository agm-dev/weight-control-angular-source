import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  constructor(
    private state:StateService
  ) {

  }

  onClickClearData() {
    this.state.clear();
  }

  ngOnInit() {
  }

}
