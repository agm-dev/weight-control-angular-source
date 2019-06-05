import { Weight } from './weight';
import { Goal } from './goal';

export class State {
  data:Weight[];
  goal:Goal;

  constructor() {
    this.data = [];
  }
}
