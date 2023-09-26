enum Order {
  LowToHigh,
  HighToLow,
  NoSort,
}

class ToggleableArray<T> extends Array<T> {

  private _state: Order = Order.NoSort

  sortToggle(
    { fromHighToLow: f1, fromHighToLow: f2 }:
      {
        fromHighToLow: (a: T, b: T) => number,
        fromLowToHigh: (a: T, b: T) => number,
      }
  ) {
    switch (this._state) {
      case Order.LowToHigh:
        super.sort(f1)
        this._state = Order.HighToLow
        break
      case Order.HighToLow:
        super.sort(f2)
        this._state = Order.LowToHigh
        break
      default:
        this._state = Order.HighToLow
    }
  }

  get order() {
    return this._state
  }

}

export default ToggleableArray
export { Order }
