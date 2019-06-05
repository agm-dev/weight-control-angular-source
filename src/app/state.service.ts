import { Injectable } from '@angular/core';
import { Subject } from  'rxjs';
import { LoggerService } from './logger.service';
import { State } from './state';
import { Weight } from './weight';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private stateStorageKey:string = 'ng-app-state';
  private state:State;
  private dataStream = new Subject();
  public dataStream$ = this.dataStream.asObservable();

  constructor(private logger:LoggerService) {
    this.load();
  }

  get(key:string) {
    if (typeof this.state[key] === 'undefined') {
      return null;
    }
    return this.state[key];
  }

  addWeight(item:Weight):void {
    this.state.data = [...this.state.data, item];
    this.logger.log('added item to state.data', item);
    //this.state.data = this.state.data.sort() // TODO:
    this.dataStream.next(item);
  }

  setWeight(data:Weight[]):void {
    this.state.data = data;
    this.logger.log('set data in state.data', data);
  }

  save() {
    if (typeof localStorage === 'undefined') {
      this.logger.log('localStorage is not available');
      return;
    }

    localStorage.setItem(this.stateStorageKey, JSON.stringify(this.state));
    this.logger.log('saved state on localStorage');
  }

  load() {
    if (typeof localStorage === 'undefined') {
      this.logger.log('localStorage is not available');
      return;
    }

    const localStorageValue:string = localStorage.getItem(this.stateStorageKey);

    this.state = localStorageValue ? JSON.parse(localStorageValue) : new State();
    this.logger.log('loaded state from localStorage', this.state);
  }

  clear() {
    if (typeof localStorage === 'undefined') {
      this.logger.log('localStorage is not available');
      return;
    }

    localStorage.clear();
    this.state = new State();
    this.logger.log('all data has been removed')
  }
}
