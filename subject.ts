/** @format */
import Observer from "./observer";

export default class VueModel {
  private _observers: Array<Observer> = [];
  private _data: { [key: string]: any } = {};

  constructor(obj?: { [key: string]: any }) {
    this._data = { ...obj };
  }

  attach(observer: Observer) {
    this._observers.push(observer);
  }

  get(key: string) {
    return this._data[key];
  }

  set(key: string, value: any) {
    this._data[key] = value;
    this.notify();
  }

  private notify() {
    for (const observer of this._observers) {
      observer.update();
    }
  }
}
