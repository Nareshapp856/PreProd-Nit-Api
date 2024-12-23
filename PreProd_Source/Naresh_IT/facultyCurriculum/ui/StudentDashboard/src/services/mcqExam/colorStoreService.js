export class ColorStoreClass {
  constructor() {
    this.availableColors = [0, 1, 2, 3, 4];
    this.colors = {
      0: "bg-gray-500",
      1: "bg-green-600",
      2: "bg-yellow-600",
      3: "bg-blue-600",
      4: "bg-red-600",
    };
  }

  betterColor(key) {
    for (let i in this.availableColors) {
      if (key >= i) continue;
      return Number(i);
    }

    return 0;
  }

  getColor(key, question, index) {
    return this.colors[key];
  }
}
