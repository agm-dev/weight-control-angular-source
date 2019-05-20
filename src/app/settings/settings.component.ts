import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { CSVService } from '../csv.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  public clearDataMessage:string;
  public exportDataMessage:string;
  public exportDataSuccess:boolean;

  constructor(
    private state:StateService,
    private CSV:CSVService
  ) {
    this.clearDataMessage = '';
    this.exportDataMessage = '';
    this.exportDataSuccess = false;
  }

  onClickClearData() {
    this.state.clear();
    this.clearDataMessage = 'All the data has been removed';
  }

  onClickExportData() {
    this.exportDataSuccess = this.CSV.exportData();
    this.exportDataMessage = this.exportDataSuccess ? 'Your data has been exported' : 'There is no data to export';
  }

  ngOnInit() {
  }

}
