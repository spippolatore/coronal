import {Keyboard, KeyCode} from './input/keyboard';
import {Mouse} from './input/mouse';
import {Touch} from './input/touch';

/**
 * Manages all input events.
 */
class InputManager {
  private keyboard: Keyboard;
  private mouse: Mouse;
  private touch: Touch;
  constructor() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
    this.touch = new Touch();
  }

  //Keyboard
  getKey(key: KeyCode) {
    return this.keyboard.getKey(key);
  }
  getKeyPressed(key: KeyCode) {
    return this.keyboard.getKeyDown(key);
  }
  getKeyReleased(key: KeyCode) {
    return this.keyboard.getKeyUp(key);
  }
  update() {
    this.keyboard.update();
  }
  //Mouse
  mousePosition() {
    return this.mouse.mousePosition;
  }
  mouseClick() {
    return this.mouse.mouseClick;
  }
  //Touch
  touches() {
    return this.touch.touches;
  }
}

var Input = new InputManager();

export {Input, KeyCode};
