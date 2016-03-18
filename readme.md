<!--![Plasma Cover](docs/cover.svg)-->

# Plasma Game Engine

[![Build Status](https://api.travis-ci.org/alaingalvan/Plasma.svg)](https://api.travis-ci.org/alaingalvan/Plasma) [![License](http://img.shields.io/:license-mit-blue.svg)](http://mit-license.org)

```bash
npm i plasma
npm i plasma-webgl    # If you want to render with WebGL
```

**Plasma** is a TypeScript Game Engine modeled after a number of libraries and engines, such as React, Angular 2, Three.js, Unreal Engine 4, Unity, Godot, and Game Maker Studio.

It's designed to have a lightweight core and extendable components, such as a Individual Renderers, Device plugins like MIDI controllers and Wacom Tablets, etc.

<!-- * [Versions - Currently @ 1.0.0](https://github.com/alaingalvan/plasma/versions)
* [Documentation](docs/readme.md)
* [Donations](https://alain.xyz/donate) -->

## 5 Minute Quick Start

Let's make a cube that moves up according the arrow up button. From there we'll add our cube character to a level, and start our game engine.

```javascript
import {GameObject, Input, KeyCode} from 'plasma';
import {Renderer, Cube} from 'plasma-webgl';

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
      this.transform.position += 10 * deltaTime; // Move 10 units per second
  }
}

// The Game is only made of one object, a CubeCharacter.
Renderer.render(CubeCharacter, document.getElementById('game'));
```

What will happen here is the `Renderer` will render the `CubeCharacter` we made onto a **canvas** created by it and update it ever 60 fps. Every frame the `update` function of the character will be called, as well as those of the components that the GameObject is made of.

If you want to go further, follow some of the tutorial examples in the docs. These tutorials are in reality full games, so you get to see the full picture!

<!-- #### Easy

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

A Rendering System is then responsible for taking our **Game** and rendering/animating it. We also use this system to get implementation specific classes like Material, Mesh for `'plasma-webgl'`, or Sprite for `'plasma-canvas'`.

### Decoupled Renderer

<!-- ![Renderer Diagram](docs/img/renderer.svg) -->

The **WebGLRenderer** for example will create a fullscreen canvas at in the **DOMElement** with `id='game'`, with a CubeCharacter at the origin, and a default camera at the point `vec3(10, 10, 10)` pointing at the origin `vec3(0, 0, 0)`.

The [Plasma WebGL Module](https://github.com/alaingalvan/plasma-webgl/docs) can handle a number of things, such as change the canvas size (the game window), make the aspect ratio of the rendered scene constant, creating custom shader materials, procedural geometry, postprocessing effects, etc.  

### Engine Processor

A Game Engine is powered by an **Update Loop**, a **Render Loop**, and a number of subsystems at different levels of abstraction, such as high level GUI managers to low level Input processors. These subsystems are detailed by Jason Gregory in his book [Game Engine Architecture](https://books.google.com/books?id=MCQbBAAAQBAJ&lpg=PP1&dq=page%2033%20game%20engine%20architecture&pg=PA33#v=onepage&q=33&f=false).

**Plasma**'s Update/Render loop is delegated to the [Renderer](), which processes Plasma's Core components like **Input** updating and **Clock** updating, to the actual draw update.
