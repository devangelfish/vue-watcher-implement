/** @format */
import VueModel from "./subject";
import Watcher from "./watcher";

export type watchHandler = (newValue?: any, oldValue?: any) => any;

export type VueOption = {
  data?: { [key: string]: any };
  watch?: { [key: string]: watchHandler };
};

export class Vue {
  private static _vm: VueModel = new VueModel();
  private static _watcher: Watcher = new Watcher(this._vm);

  public static init(obj: VueOption) {
    if (obj["data"]) {
      this._vm = new VueModel(obj["data"]);
      this._watcher = new Watcher(this._vm);
      this._vm.attach(this._watcher);
    }
    if (obj["watch"]) {
      for (const [key, func] of Object.entries(obj["watch"])) {
        this._watcher.$watch(key, func);
      }
    }
    return this;
  }

  static $get(key: string) {
    return this._vm.get(key);
  }

  static $set(key: string, value: any) {
    return this._vm.set(key, value);
  }
}
