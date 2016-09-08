# Coronal Game Engine

[![Npm Package][npm-img]][npm-url] [![Build Status][travis-img]][travis-url] ![Release][release-img] [![Dependency Status][david-img]][david-url] [![devDependency Status][david-dev-img]][david-dev-url]

```bash
npm i coronal --save
```

**Coronal** is a TypeScript Game Engine modeled after a number of libraries and engines, such as [React](https://facebook.github.io/react/), [Unity](http://unity3d.com/), [Angular 2](http://angular.io), [Three.js](http://threejs.org/), Unreal Engine 4, Godot, and Game Maker Studio.

It's designed to have a lightweight core and extendable components, such as a Individual Renderers, Device plugins like MIDI controllers and Wacom Tablets, etc. A bundled and minified version of the engine is very small, and designed to work with tree-shaking systems like [WebPack 2](https://github.com/webpack/webpack/issues/1433).

## 5 Minute Quick Start

Let's make a game where an ship can move up and down shooting to the right.

```js
import {Pawn, GameObject, Input, KeyCode} from 'coronal';
import {Sprite} from 'coronal/webgl';

import {Bullet} from './bullet';

class SpaceShip extends GameObject {
  constructor(...args) {
    super(...args);

    this.inputMap = {
      move: this.move
    }
  }
  update(deltaTime: number) {

    // Let's make a function that helps us move.
    let move = (dir: string, spd: number) => 
        this.transform.position[dir] += spd * deltaTime;

    if (Input.getKey(KeyCode.ArrowUp))
      move('y', -10);

    if (Input.getKey(KeyCode.ArrowDown))
      move('y', 10);

    if (Input.getKey(KeyCode.Space))
      shoot();

    if (outOfBounds)
      this.destroy();
  }

  shoot() {
    this.root.spawn(Bullet, this.position);
  }

  render() {
    return Sprite({src: '/assets/ship.png', position: vec3(0, 0, 0)});
  }
}

export class Game extends GameObject {
  render() {
    return Scene(
      SpaceShip({position: vec3(0, 0, 4)}),
      Astroid()
  );
  }
}

```

### React Integration

Coronal works out of the box with React, just import `'react-coronal'` and you're ready to roll, just mount your game's root node under the prop `game`.

```js
import * as React from 'react';
import {Canvas} from 'react-coronal';

import {Game} from './game';

const styles = {
  width: '100vw',
  height: '100vh'
}

// Stateless Components :)
export const ReactGame = (props) => (<Canvas style={styles} game={Game} />);

```

## Architecture

Fundimentally, a Game can be described as a nested tree of components. Each component can communicate with the other components thanks to references between them, thus they can remove themselves, spawn new members of the tree, even change the tree entirely.

### GameObject Tree

Coronal follows the **Component Tree Architecture** similar to most front end frameworks like [React](https://facebook.github.io/react/) and [Angular 2](https://angular.io). You can think of a **Game** as a tree of `GameObject`(s), each of which is made of `GameObject`(s). This design applies to everything, from characters to levels, to the entire game, everything is a `GameObject`.

However, unlike Web Components, a GameObject follows a *polling architecture* vs a *reactive architecture*, simply due to the nature of games and their dependence on a frame rate, so **GameObjects** follow the interface:



```ts
interface GameObject {
  constructor(state: any, ...args: GameObject[]),
  // Primary Functions
  update: (deltaTime: number) => void,
  render: () => GameObject | void,

  // Tree Pointers
  get root: GameObject | null,

  get components: ComponentTree, // Immutable data structure similar to a map, you can get and add to it.
  set components: (...args: GameObject[]) => ComponentTree,

  // Events
  destroy: (gameObject = this) => void,
  spawn: (gameObject: GameObject) => void,

  // Lifecycle Roots
  onSpawn: () => void,
  onDestroy: () => void,
  onCollide: (g: gameObject) => void
  onComponentsChange: () => void
}
```

You'll note that unlike React, a component has access to both it's parent and children.

Building on top of this architecture are the **Scene**, **Actor**, and **Pawn** classes, which serve to be preconfigured GameObjects with components to allow things like positioning and interfacing with a game's inputs.

A Rendering System is then responsible for taking our **Game** and rendering/animating it.

We also use this system to get implementation specific classes like 3D Models exported from programs like Blender to Sprites.

### Decoupled Renderer

The [Coronal WebGL Module](https://github.com/alaingalvan/coronal-webgl) can handle a number of things, such as change the canvas size (the game window), make the aspect ratio of the rendered scene constant, creating custom shader materials, procedural geometry, postprocessing effects, etc.  

### Engine Processor

A Game Engine is powered by an **Update Loop**, a **Render Loop**, and a number of subsystems at different levels of abstraction, from high level GUI managers to low level Input processors. Jason Gregory in his book [Game Engine Architecture](https://books.google.com/books?id=MCQbBAAAQBAJ&lpg=PP1&dq=page%2033%20game%20engine%20architecture&pg=PA33#v=onepage&q=33&f=false) gives a great taxonomy of game engine modules.

**Coronal**'s Update/Render loop is delegated to the [Renderer](https://github.com/alaingalvan/coronal-webgl/blob/master/src/rendering/renderer.ts), which processes coronal's Core components like **Input** updating and **Clock** updating, to the actual draw update.

[website-img]: docs/brand/cover.png
[website-url]: https://coronal.io
[release-img]: https://img.shields.io/badge/release-0.1.0-4dbfcc.svg?style=flat-square
[license-img]: http://img.shields.io/:license-isc-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/ISC
[david-url]: https://david-dm.org/alaingalvan/coronal
[david-img]: https://david-dm.org/alaingalvan/coronal.svg?style=flat-square
[david-dev-url]: https://david-dm.org/alaingalvan/coronal#info=devDependencies
[david-dev-img]: https://david-dm.org/alaingalvan/coronal/dev-status.svg?style=flat-square
[travis-img]: https://api.travis-ci.org/alaingalvan/coronal.svg?style=flat-square
[travis-url]:https://travis-ci.org/alaingalvan/coronal
[npm-img]: https://img.shields.io/npm/v/coronal.svg?style=flat-square
[npm-url]: http://npm.im/coronal
[coveralls-img]: https://coveralls.io/repos/github/alaingalvan/coronal/badge.svg?branch=master&style=flat-square
[coveralls-url]:https://coveralls.io/github/alaingalvan/coronal