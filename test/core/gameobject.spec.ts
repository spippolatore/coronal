import {assert} from 'chai';

import {GameObject} from '../../src/core/gameobject';

describe('GameObject', () => {
  it('should add a component', () => {
    class TestActor extends GameObject {

    }
    var actor = new TestActor();
    actor.addComponent(new TestActor());
    assert(actor.components.length > 0);
  });
});
