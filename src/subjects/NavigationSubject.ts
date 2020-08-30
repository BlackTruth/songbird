type Observer = (path: string) => void;
class NavigationSubject {
  observers : Observer[];

  lastPath: string | null;

  constructor() {
    this.observers = [];
    this.lastPath = null;
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
    if (this.lastPath) {
      observer(this.lastPath);
    }
  }

  unsubscribe(observer: Observer) {
    this.observers.filter((obs) => obs !== observer);
  }

  notify(path: string) {
    this.lastPath = path;
    this.observers.forEach((observer) => observer(path));
  }
}

const navigationSubject = new NavigationSubject();
export default navigationSubject;
