/** @format */
import { watchHandler } from "./vue";
import VueModel from "./subject";
import Observer from "./observer";

export default class Watcher implements Observer {
  private _vm: VueModel; // subject
  private _data: { [key: string]: any } = {};
  private _callbacks: {
    [key: string]: watchHandler;
  } = {};

  constructor(_vm: VueModel) {
    this._vm = _vm;
    this._vm.attach(this);
  }

  $watch(key: string, func: (newValue: string) => any) {
    this._callbacks[key] = func;
    this._data[key] = this._vm.get(key);
  }

  update() {
    for (const [key, value] of Object.entries(this._data)) {
      if (this._data[key]) {
        const oldValue = value;
        const newValue = this._vm.get(key);
        if (oldValue !== newValue) {
          this._callbacks[key](newValue, oldValue);
          this._data[key] = newValue;
        }
      }
    }
  }
}
