import { Weight } from './weight';
import { Goal } from './goal';

export class State {
  data:Weight[];
  goal:Goal;

  constructor() {
    this.data = [];
    this.goal = new Goal(
      new Weight('2019-06-05', 79),
      new Weight('2019-06-10', 76),
    );
  }
}
