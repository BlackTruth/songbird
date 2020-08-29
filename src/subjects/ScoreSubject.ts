type Observer = (score: number) => void;
class ScoreSubject {
  observers : Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers.filter((obs) => obs !== observer);
  }

  notify(score: number) {
    this.observers.forEach((observer) => observer(score));
  }
}

const scoreSubject = new ScoreSubject();
export default scoreSubject;
