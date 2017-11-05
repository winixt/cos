import { feedback } from './table';

class Feedback {
  constructor({ connector }) {
    this.connector = connector;
  }
  addFeedback(args) {
    return this.connector(feedback).insert({ ctime: Date.now(), ...args });
  }
}

export default Feedback;
