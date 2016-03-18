export class Mouse {
  public mouseClick = false;
  public mousePosition: { x: number, y: number };
  public element: HTMLElement;
  constructor() {
    //Mouse
    window.addEventListener('mousemove', (e) => this.mousePositionCallback(e));
    window.addEventListener('mousedown', (e) => this.mouseDownCallback(e));
    window.addEventListener('mouseup', (e) => this.mouseUpCallback(e));
  }
  mousePositionCallback(event: MouseEvent) {
    var canvasRect = {left: 0, top: 0} || this.element.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - canvasRect.left - root.scrollLeft;
    var mouseY = event.clientY - canvasRect.top - root.scrollTop;
    this.mousePosition = { x: mouseX, y: mouseY };
  }
  mouseDownCallback(event: MouseEvent) {
    this.mouseClick = true;
  }
  mouseUpCallback(event: MouseEvent) {
    this.mouseClick = false;
  }
}
