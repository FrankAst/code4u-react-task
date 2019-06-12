// @flow
/* eslint-disable no-use-before-define */

import { observable, action } from 'mobx';

export type StoreT = Class<Store>;
export type ContainerT = Class<Container>;
export type BoxT = Class<Box>;
export type ItemsT = Array<ContainerT | BoxT>;

const parseStoreFromJSON = (items: ItemsT): ContainerT => {
  const container = new Container();
  if (items?.length === 0) return container;
  items.forEach(item => {
    switch (item?.type) {
      case 'container':
        const subContainer = parseStoreFromJSON(item.items);
        container.addContainer(subContainer);
        break;
      case 'box':
        const box = new Box(item.color);
        container.addBox(box);
        break;
      default:
        throw new Error(`Unknown type of item: ${store.type}`);
    }
  });
  return container;
};
class Box {
  constructor(color: string) {
    this.color = color;
  }

  @observable type: string = 'box';
  @observable color: string;

  @action changeColor = color => {
    this.color = color;
  };
}

class Container {
  @observable type: string = 'container';
  @observable items: ItemsT = [];

  @action addContainer = (container: ?ContainerT) => {
    this.items.push(container || new Container());
  };

  @action addBox = (box: ?BoxT) => {
    this.items.push(box || new Box('#F5A540'));
  };
}

class Store {
  @observable rootContainer: ContainerT = new Container();

  @action buildFromJson = (newStore: $Shape<ContainerT>) => {
    this.rootContainer = parseStoreFromJSON(newStore.items);
  };
}

const store = new Store();
export default store;
