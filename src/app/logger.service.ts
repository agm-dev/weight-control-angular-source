import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
const prefix:string = '[ng-app]';

function generateText(text:string, data?:any) {
  const extra = typeof data !== 'undefined' ? JSON.stringify(data) : '';
  return extra.length ? `${prefix} ${text} ${extra}` : `${prefix} ${text}`;
}
*/

export class LoggerService {

  private prefix:string = '[ng-app]';

  private generateText(text:string, data?:any) {
    const extra = typeof data !== 'undefined' ? JSON.stringify(data) : '';
    return extra.length ? `${this.prefix} ${text} ${extra}` : `${this.prefix} ${text}`;
  }

  log(text:string, data?:any) {
    console.log(this.generateText(text, data));
    if (typeof data !== 'undefined') console.log(data);
  }

  warn(text:string, data?:any) {
    console.warn(this.generateText(text, data));
    if (typeof data !== 'undefined') console.warn(data);
  }

  error(text:string, data?:any) {
    console.error(this.generateText(text, data));
    if (typeof data !== 'undefined') console.error(data);
  }

}
