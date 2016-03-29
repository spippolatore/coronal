import {GameObject} from './gameobject';
import {Input} from '../input';
/**
 * A GameEngine is the root node of a given Game.
 * It handles various game Engine systems like the Input Component.
 */
export class GameEngine extends GameObject {
  constructor() {
    super();
    this.addComponent(Input);
  }
  update(deltaTime: number) {
  }
}

var Engine = new GameEngine();

export {Engine};
