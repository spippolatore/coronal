/**
 * GameObjects are Objects that can be processed Coronal.
 *
 * They are composed of components such as transform, mesh, material, etc.
 */
export abstract class GameObject {
  // A pointer to your current root
  public root: GameObject;

  // A Reference to your top root.
  public scene: GameObject;

  // All your components in your scene
  public components = [];

  update(deltaTime: number) {
    this.components.map((o) => {
      if ('update' in o)
        o.update(deltaTime)
    });
  };

  // Adds a component to this gameobject.
  addComponent(o: GameObject|any) {
    if (typeof o === 'function') {
      var r = new o();
      r.root = this;
      this.components.push(r);
    }
    if (typeof o === 'object') {
      o.root = this;
      this.components.push(o);
    }
  }

  // Finds all components of a given type.
  getComponents<T extends Function>(type: T): T[] {
    return this.components.filter((o) => o instanceof type);
  }

  // Destroys this gameobject.
  destroy() {
    if (this.root)
      this.root.components = this.root.components.filter((o: GameObject) => o !== this);
  }

  render() {
    this.components.map((o) => {
      if ('render' in o)
        o.render();
    });
  }
}
