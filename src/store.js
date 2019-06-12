// @flow
/* eslint-disable no-use-before-define */

import { observable, action } from 'mobx';

export type StoreT = Class<Store>;
export type ContainerT = Class<Container>;
export type BoxT = Class<Box>;
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
  @observable items: Array<ContainerT | BoxT> = [];

  @action addContainer = () => {
    this.items.push(new Container());
  };

  @action addBox = () => {
    this.items.push(new Box('#F5A540'));
  };
}

class Store {
  @observable rootContainer: ContainerT = new Container();
}

const store = new Store();
export default store;
