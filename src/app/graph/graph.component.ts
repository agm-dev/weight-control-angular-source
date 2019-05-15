import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../logger.service';
import { StateService } from '../state.service';
import { Weight } from '../weight';

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

  getData() {
    const data = this.state.get('data');
    const x = data.map(item => item.date);
    const y = data.map(item => item.amount);
    return [
      { x, y, type: 'scatter', mode: 'linex+points', marker: { color: 'red' }},
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
