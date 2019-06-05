import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../logger.service';
import { StateService } from '../state.service';
import { Weight } from '../weight';
import { Goal } from '../goal';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy {

  private dataSubscription:Subscription;
  public graph:any; // TODO: change this to Graph class type
  public graphStyle:any;

  constructor(
    private logger:LoggerService,
    private state:StateService,
  ) {
    this.graph = {
      data: [],
      layout: {
        autosize: true,
      }
    }

    this.graphStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
    }
  }

  protected generateGoalLine(dates:string[], goal:Goal) {
    const initialMs = (new Date(goal.initial.date)).getTime();
    const targetMs = (new Date(goal.target.date)).getTime();
    const day = 1000 * 60 * 60 * 24;
    const days = (targetMs - initialMs) / day;
    const initialAmount = goal.initial.amount;
    const targetAmount = goal.target.amount;
    const diff = (targetAmount - initialAmount) / days;

    const goalLine = { x: [], y: [] };
    const result = dates.reduce((result, date) => {
      const dateMs = (new Date(date).getTime());
      if (dateMs < initialMs || dateMs > targetMs) {
        return result;
      }

      const diffDays = (dateMs - initialMs) / day;
      const weight = initialAmount + (diff * diffDays);
      const normalizedWeight = Math.round(weight * 10) / 10;
      return { x: [...result.x, date], y: [...result.y, normalizedWeight] };
    }, goalLine);

    // add initial and final if not already there
    const firstDateMs = (new Date(result.x[0])).getTime();
    if (firstDateMs !== initialMs) {
      result.x = [goal.initial.date, ...result.x];
      result.y = [goal.initial.amount, ...result.y];
    }
    const lastDateMs = (new Date(result.x[result.x.length - 1])).getTime();
    if (lastDateMs !== targetMs) {
      result.x = [...result.x, goal.target.date];
      result.y = [...result.y, goal.target.amount];
    }

    return result;
  }

  getData() {
    const data = this.state.get('data');
    const goal = this.state.get('goal');
    const x = data.map(item => item.date);
    const y = data.map(item => item.amount);
    const goalLine = this.generateGoalLine(x, goal);
    this.logger.log('goalLine', goalLine);
    return [
      { x, y, type: 'scatter', mode: 'linex+points', marker: { color: 'red' }, name: 'weight'},
      { x: goalLine.x, y: goalLine.y, type: 'scatter', mode: 'linex+points', marker: { color: 'blue' }, name: 'goal'},
    ];
  }

  addData(item:Weight) {
    const xValue = item.date;
    this.graph.data.x.push(xValue);

    const yValue = item.amount;
    this.graph.data.y.push(yValue);

    this.logger.log('added new data to graph', item);
  }

  ngOnInit() {
    this.graph.data = this.getData();
    this.dataSubscription = this.state.dataStream$.subscribe(this.addData);
    this.logger.log('subscribed to dataStream$');
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.logger.log('unsubscribed from dataStream$');
  }

}
