import { Weight } from './weight';

export class Goal {
  initial:Weight;
  target:Weight;

  constructor(initial:Weight, target:Weight) {
    this.initial = initial;
    this.target = target;
  }
}
