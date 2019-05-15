import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public graph:any; // TODO: change this to Graph class type
  public graphStyle:any;

  constructor() {
    this.graph = {
      data: [
        {
          x: ['01/05', '04/05', '23/05'],
          y: [78.5, 78.3, 79.4],
          type: 'scatter',
          mode: 'linex+points',
          marker: { color: 'red' },
        },
      ],
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

  ngOnInit() {
  }

}
