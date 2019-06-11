// @flow

import { observable, action } from 'mobx';

class Box {
  @observable type: string = 'box';
  @observable color: string;
}

class Container {
  @observable type: string = 'container';
  @observable items: Array<any> = [];

  @action addContainer = () => {
    this.items.push(new Container());
  };

  @action addBox = () => {
    this.items.push(new Box());
  };
}

class Store {
  @observable rootContainer = new Container();
}

const store = new Store();
export default store;
