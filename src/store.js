// @flow

import { observable, action } from 'mobx';

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
  @observable items: Array<any> = [];

  @action addContainer = () => {
    this.items.push(new Container());
  };

  @action addBox = () => {
    this.items.push(new Box('#F5A540'));
  };
}

class Store {
  @observable rootContainer = new Container();
}

const store = new Store();
export default store;
