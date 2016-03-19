import {assert} from 'chai';

import {GameObject} from '../../src/core/gameobject';

class TestActor extends GameObject {
  public ticks = 0;
  update(deltaTime: number) {
    super.update(deltaTime);
    this.ticks++;
  }
}

describe('GameObject', () => {

  it('should add a component', () => {
    var actor = new TestActor();
    actor.addComponent(new TestActor());
    assert(actor.components.length > 0);
  });

  it('should find components of a type', () => {
    var actor = new TestActor();
    actor.addComponent(new TestActor());
    actor.addComponent(new TestActor());
    assert(actor.getComponents(TestActor).length === 2);
  });

  it('should update', () => {
    var actor = new TestActor();
    actor.update(1);
    actor.update(1);
    actor.update(1);
    assert(actor.ticks === 3);
  });


});
