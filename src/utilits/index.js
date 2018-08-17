class DeviceSize {
  /**
   *
   * @type {number}
   * @private
   */
  _width = 0;
  /**
   *
   * @type {number}
   * @private
   */
  _height = 0;

  /**
   *
   * @type {Array}
   * @private
   */
  _subscribers = [];

  constructor() {
    window.addEventListener('resize', this._onResize, false);
    this._onResize();
  }

  _onResize = () => {
    this._width = document.body.clientWidth;
    this._height = document.body.clientHeight;
    this._subscribers.forEach(i => i.func(this.size));
  };

  get size() {
    return {
      width : this._width,
      height : this._height
    }
  }

  /**
   *
   * @param func
   * @returns {number}
   */
  subscribe = (func) => {
    const id = new Date().getTime();
    this._subscribers.push({
      id,
      func
    });
    return id;
  };

  /**
   *
   * @param id
   */
  unsubscribe = id => {
    this._subscribers = this._subscribers.filter(elem => elem.id !== id);
  }
}

export const DeviceSizeService = new DeviceSize();
