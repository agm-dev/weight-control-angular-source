import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { CSVService } from '../csv.service';
import { LoggerService } from '../logger.service';

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
  public fileData:string;

  constructor(
    private state:StateService,
    private CSV:CSVService,
    private logger:LoggerService,
  ) {
    this.clearDataMessage = '';
    this.exportDataMessage = '';
    this.exportDataSuccess = false;
    this.importDataMessage = '';
    this.importDataSuccess = false;
    this.fileData = '';
  }

  onClickClearData() {
    this.state.clear();
    this.clearDataMessage = 'All the data has been removed';
  }

  onClickExportData() {
    this.exportDataSuccess = this.CSV.exportData();
    this.exportDataMessage = this.exportDataSuccess ? 'Your data has been exported' : 'There is no data to export';
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [ file ] = event.target.files;
      reader.onload = () => {
        this.fileData = reader.result.toString();
        this.logger.log('reader has loaded the file content');
      }
      reader.onerror = () => {
        this.fileData = '';
        this.logger.error('an error has ocurred reading the file')
      };

      reader.readAsText(file, 'UTF-8');
    }
  }

  onClickImportData():void {
    const data = this.CSV.parse(this.fileData);
    this.state.setWeight(data);
    this.importDataSuccess = true;
    this.importDataMessage = 'The data has been imported';
  }

  ngOnInit() {
  }

}
