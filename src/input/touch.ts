export interface ITouches {
  identifier: string,
  pageX: number,
  pageY: number
}

export class Touch {
  public touches:ITouches[] = [];
  constructor() {
    addEventListener("touchstart", this.touchStartCallback, false);
    addEventListener("touchend", this.touchEndCallback, false);
    addEventListener("touchcancel", this.touchCancelCallback, false);
    addEventListener("touchmove", this.touchMoveCallback, false);
  }
  touchStartCallback = (e) => {
    this.touches.push(this.copyTouch(e.changedTouches));
  }
  touchEndCallback = (e) => {
    var touches = e.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      var idx = this.ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        this.touches.splice(idx, 1);  // remove it; we're done
      }
    }
  }
  touchCancelCallback = (e) => {
    var touches = e.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      this.touches.splice(i, 1);  // remove it; we're done
    }
  }
  touchMoveCallback = (e) => {
    var touches = e.changedTouches;
    for (var i = 0; i < touches.length; i++) {
      var idx = this.ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        this.touches.splice(idx, 1, this.copyTouch(touches[i]));  // swap in the new touch record
      }
    }
  }

  private copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  }
  private ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < this.touches.length; i++) {
      var id = this.touches[i].identifier;

      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
}
