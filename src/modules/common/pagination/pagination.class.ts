export class Pagination<T> {
  items: T[];

  count: number;

  constructor(items, count) {
    this.items = items;
    this.count = count;
  }
}
