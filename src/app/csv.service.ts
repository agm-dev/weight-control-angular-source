import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { LoggerService } from './logger.service';
import { StateService } from './state.service';
import { Weight } from './weight';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor(
    private logger:LoggerService,
    private state:StateService
  ) {

  }

  protected generateCSVContent(data:Weight[]):string {
    const lines:string[] = data.reduce(
      (result, line) => [...result, `${line.date},${line.amount}`],
      []
    );
    return lines.join('\r\n');
  }

  protected downloadCSVContent(content:string, filename:string):void {
    const type:string = 'data:text/csv;charset=utf-8';
    const blob = new Blob([ content ], { type });
    saveAs(blob, filename);
  }

  exportData():boolean {
    const data:Weight[] = this.state.get('data');
    if (!data.length) {
      return false;
    }

    const content:string = this.generateCSVContent(data);
    this.logger.log('CSV content to export', content);

    const filename:string = 'weight-control-data.csv';
    this.downloadCSVContent(content, filename);
    return true;
  }
}
