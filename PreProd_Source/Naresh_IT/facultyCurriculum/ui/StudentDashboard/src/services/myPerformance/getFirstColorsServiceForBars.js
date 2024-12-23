export class GetFirstColorsClass {
  static getFirstColors = undefined;

  static GetFirstColorsInstnace() {
    if (!this.getFirstColors) this.getFirstColors = new GetFirstColorsClass();
  }

  constructor() {
    this.observers = {};
  }

  subscribe(key, observer) {
    if (!this.observers[key]) this.observers[key] = [];

    this.observers[key].push(observer);
  }

  notify(key, message) {
    if (this.observers[key])
      this.observers[key].forEach((observer) => observer(message));
  }
}

export const GetFirstColorsServiceForBars = new GetFirstColorsClass();
