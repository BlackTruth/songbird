type Observer = () => void;
class CorrectSubject {
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

  notify() {
    this.observers.forEach((observer) => observer());
  }
}

const correctSubject = new CorrectSubject();
export default correctSubject;
