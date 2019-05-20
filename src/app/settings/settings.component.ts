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
  public importDataMessage:string;
  public importDataSuccess:boolean;

  constructor(
    private state:StateService,
    private CSV:CSVService
  ) {
    this.clearDataMessage = '';
    this.exportDataMessage = '';
    this.exportDataSuccess = false;
    this.importDataMessage = '';
    this.importDataSuccess = false;
  }

  onClickClearData() {
    this.state.clear();
    this.clearDataMessage = 'All the data has been removed';
  }

  onClickExportData() {
    this.exportDataSuccess = this.CSV.exportData();
    this.exportDataMessage = this.exportDataSuccess ? 'Your data has been exported' : 'There is no data to export';
  }

  onClickImportData():void {
    this.importDataSuccess = this.CSV.importData();
    this.importDataMessage = this.importDataSuccess ? 'The data has been imported' : 'Error on importing data from CSV file';
  }

  ngOnInit() {
  }

}
