/**
 * Singleton for handling Mouse Events.
 */
export class Mouse {

  private _position: {
    x: number,
    y: number
  };

  private _click = {
    left: false,
    right: false,
    middle: false,
    four: false,
    five: false
  };

  public element: HTMLElement;

  constructor(element: HTMLElement | Window = window) {
    element.addEventListener('mousemove', this.mousePositionCallback);
    element.addEventListener('mousedown', this.mousePressCallback);
    element.addEventListener('mouseup', this.mousePressCallback);
  }

  get click() {
    return this._click;
  }

  get position() {
    return this._position;
  }

  private mousePositionCallback = (event: MouseEvent) => {
    var canvasRect = { left: 0, top: 0 } || this.element.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - canvasRect.left - root.scrollLeft;
    var mouseY = event.clientY - canvasRect.top - root.scrollTop;
    this._position = { x: mouseX, y: mouseY };
  }

  private mousePressCallback = (event: MouseEvent) => {
    let bitSet = (bit: number, byte: number) => ((1 << bit) & byte) > 0;
    this._click = {
      left: bitSet(0, event.buttons),
      right: bitSet(1, event.buttons),
      middle: bitSet(2, event.buttons),
      four: bitSet(3, event.buttons),
      five: bitSet(4, event.buttons),
    };
  }
}
