<!--![Coronal Cover](docs/cover.svg)-->

# Coronal Game Engine

[![Build Status](https://api.travis-ci.org/alaingalvan/coronal.svg)](https://travis-ci.org/alaingalvan/coronal) [![License](http://img.shields.io/:license-mit-blue.svg)](http://mit-license.org) [![Coveralls](https://coveralls.io/repos/github/alaingalvan/coronal/badge.svg?branch=master)](https://coveralls.io/github/alaingalvan/coronal)  [![Dependency Status](https://david-dm.org/alaingalvan/coronal.svg)](https://david-dm.org/alaingalvan/coronal) [![devDependency Status](https://david-dm.org/alaingalvan/coronal/dev-status.svg)](https://david-dm.org/alaingalvan/coronal#info=devDependencies) [![npm version](https://badge.fury.io/js/coronal.svg)](https://badge.fury.io/js/coronal)
```bash
npm i coronal
```

**Coronal** is a TypeScript Game Engine modeled after a number of libraries and engines, such as React, Unity, Angular 2, Three.js, Unreal Engine 4, Godot, and Game Maker Studio.

It's designed to have a lightweight core and extendable components, such as a Individual Renderers, Device plugins like MIDI controllers and Wacom Tablets, etc. A bundled and minified version of the engine is very small, and designed to work with tree-shaking systems like [WebPack 2](https://github.com/webpack/webpack/issues/1433).

<!-- * [Versions - Currently @ 1.0.0](https://github.com/alaingalvan/coronal/versions)
* [Documentation](docs/readme.md)
* [Donations](https://alain.xyz/donate) -->

## 5 Minute Quick Start

Let's make a cube that moves up according the arrow up button. From there we'll add our cube character to a level, and start our game engine.

```javascript
import {GameObject, Input, KeyCode} from 'coronal';
import {Renderer, Cube} from 'coronal-webgl';

/**
 * A cube that moves up according the arrow up button, and shoots a cube.
 */
class CubeCharacter extends GameObject {

  constructor() {
    super();
    // Add a Cube Component to our GameObject.
    this.addComponent(Cube);
  }

  update(deltaTime: number) {    
    // Check if the ArrowUp key is currently pressed.
    if (Input.getKey(KeyCode.ArrowUp))
      this.transform.position.x += 10 * deltaTime; // Move 10 units per second
  }
}

// The Game is only made of one object, a CubeCharacter.
Renderer.render(CubeCharacter, document.getElementById('game'));
```

What will happen here is the `Renderer` will render the `CubeCharacter` we made onto a **canvas** created by it and update it ever 60 fps. Every frame the `update` function of the character will be called, as well as those of the components that the GameObject is made of.

<!-- If you want to go further, follow some of the tutorial examples in the docs. These tutorials are in reality full games, so you get to see the full picture!

#### Easy

- [Anaconda - Snake Clone]()
- [Blitz - 1984 Clone]()

#### Intermediate

- [PXWars - Top Down Shooter]()
- [SoundStrike - MIDI Piano Practice]()

#### Challenging

- [Beast - Monster RPG]()
- [Ora - 2D Platformer]()
- [Caliber - Online Shooter]() -->

## Architecture

<!-- ![Game Tree](docs/img/gametree.svg) -->

### GameObject Tree

You can think of a **Game** as a tree of `GameObject`(s), each of which is made of components. This design applies to everything, from characters to levels, to the entire game, everything is a `GameObject`.

A Rendering System is then responsible for taking our **Game** and rendering/animating it. We also use this system to get implementation specific classes like 3D Models exported from programs like Blender to Sprites.

### Decoupled Renderer

<!-- ![Renderer Diagram](docs/img/renderer.svg) -->

The **WebGLRenderer** for example will create a fullscreen canvas at in the **DOMElement** with `id='game'`, with a CubeCharacter at the origin, and a default camera at the point `vec3(10, 10, 10)` pointing at the origin `vec3(0, 0, 0)`.

The [Coronal WebGL Module](https://github.com/alaingalvan/coronal-webgl) can handle a number of things, such as change the canvas size (the game window), make the aspect ratio of the rendered scene constant, creating custom shader materials, procedural geometry, postprocessing effects, etc.  

### Engine Processor

A Game Engine is powered by an **Update Loop**, a **Render Loop**, and a number of subsystems at different levels of abstraction, such as high level GUI managers to low level Input processors. These subsystems are detailed by Jason Gregory in his book [Game Engine Architecture](https://books.google.com/books?id=MCQbBAAAQBAJ&lpg=PP1&dq=page%2033%20game%20engine%20architecture&pg=PA33#v=onepage&q=33&f=false).

**Coronal**'s Update/Render loop is delegated to the [Renderer](https://github.com/alaingalvan/coronal-webgl/blob/master/src/rendering/renderer.ts), which processes coronal's Core components like **Input** updating and **Clock** updating, to the actual draw update.
