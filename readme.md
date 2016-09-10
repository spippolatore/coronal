# Coronal Game Engine

[![Npm Package][npm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
![Release][release-img]
[![Dependency Status][david-img]][david-url]
[![devDependency Status][david-dev-img]][david-dev-url]

```bash
npm i coronal -S
```

> **Note**: This project is a work in progress, still trying to stablize the spec!

**Coronal** is a TypeScript Game Library modeled after [React](https://facebook.github.io/react/), [Unity](http://unity3d.com/), [Angular 2](http://angular.io), [Three.js](http://threejs.org/), [Unreal Engine 4](https://www.unrealengine.com), [Godot](https://godotengine.org/), and [Game Maker Studio](http://www.yoyogames.com/gamemaker).

## 5 Minute Quick Start

Let's make a game where an ship can move.

```js
import {Pawn, GameObject} from 'coronal/core';
import {Sprite} from 'coronal/graphics';
import {Engine} from 'coronal/webgl';

let App = () =>
  Pawn({position: {x: 4, y: 4} })(
    Sprite({src: '/sprites/spaceship.png'})
    Sprite({src: '/sprites/booster.gif'})
  );

let node = document.getElementById('game-canvas');

Engine.render(App, node);
```

### React Integration

Coronal works out of the box with React, import `'react-coronal'` and you're ready to roll, just mount your game's root node as a child of the `Canvas` component.

```js
import * as React from 'react';
import Canvas from 'react-coronal';

import Game from './game';

const styles = {
  width: '100vw',
  height: '100vh'
}

// Stateless Components :)
export const ReactGame = (props) => (
  <Canvas style={styles}>
    {Game}
  </Canvas>
);

```

## Architecture

Fundimentally, a Game can be described as a nested tree of components. Each component can communicate with the other components thanks to references between them, thus they can remove themselves, spawn new members of the tree, even change the tree entirely.

### GameObject Tree

Coronal follows the **Component Tree Architecture** similar to most front end frameworks like [React](https://facebook.github.io/react/) and [Angular 2](https://angular.io). You can think of a **Game** as a tree of `GameObject`(s), each of which is made of `GameObject`(s). This design applies to everything, from characters to levels, to the entire game, everything is a `GameObject`.

However, unlike Web Components, a GameObject follows a *polling architecture* vs a *reactive architecture*, simply due to the nature of games and their dependence on a frame rate, so **GameObjects** follow the interface:

```ts
class GameObject {
  constructor(props: any),
  // Primary Functions
  update: (deltaTime: number) => void,
  render: () => GameObject | void,

  // Tree Pointers
  get root: GameObject | null,

  get components:  GameObject[], // Immutable data structure similar to a map, you can get and add to it.
  set components: (args: GameObject[]) => void,

  // Outer Events
  destroy: (gameObject = this) => void,
  spawn: (gameObject: GameObject | GameObject[], root = this.root) => void,

  // Lifecycle Roots
  onSpawn: () => void,
  onDestroy: () => void,
  onComponentsChange: () => void
}
```

You'll note that unlike React, a component has access to both it's parent and children.

A Rendering System is then responsible for taking our **Game** and rendering/animating it, bind input events, etc.

We also use this system to get implementation specific classes like 3D Models exported from programs like Blender to Sprites.

### Decoupled Renderer

The [Coronal WebGL Module](https://github.com/alaingalvan/coronal-webgl) can handle a number of things, such as change the canvas size (the game window), make the aspect ratio of the rendered scene constant, creating custom shader materials, procedural geometry, postprocessing effects, etc.

```bash
|- coronal/
  |- graphics/    # Adapters for implementation specific constructs
    |- webgl/
    |- canvas/
    |- svg/
  |- core/
  |- math/
```

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
[travis-img]: https://img.shields.io/travis/alaingalvan/coronal.svg?style=flat-square
[travis-url]:https://travis-ci.org/alaingalvan/coronal
[npm-img]: https://img.shields.io/npm/v/coronal.svg?style=flat-square
[npm-url]: http://npm.im/coronal
[coveralls-img]: https://coveralls.io/repos/github/alaingalvan/coronal/badge.svg?branch=master&style=flat-square
[coveralls-url]:https://coveralls.io/github/alaingalvan/coronal