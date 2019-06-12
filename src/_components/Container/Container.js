// @flow
/* eslint-disable jsx-a11y/mouse-events-have-key-events, react/no-array-index-key */

import * as React from 'react';
import Box, { type BoxT } from '_components/Box/Box';
import Tooltip from '_components/Tooltip/Tooltip';
import { observer } from 'mobx-react';
import s from './Container.scss';

export type ContainerT = {
  type: string,
  items: Array<BoxT | ContainerT>,
};

type Props = {
  container: ContainerT,
};

@observer
class Container extends React.PureComponent<Props, void> {
  getChildren = (items: Array<BoxT | ContainerT>): ?Array<React.Element> => {
    if (items?.length > 0) {
      return items.map((item, idx) => {
        switch (item.type) {
          case 'box':
            return (
              <div key={idx} className={s.child}>
                <Box box={item} />
              </div>
            );
          case 'container':
            return (
              <div key={idx} className={s.child}>
                <Container container={item} />
              </div>
            );
          default:
            throw new Error(`Undentified type of item: ${item.type}`);
        }
      });
    }
    return null;
  };

  getTooltipBody = () => {
    const { container } = this.props || {};
    const { addContainer, addBox } = container;
    return (
      <>
        <button onClick={() => addContainer()} type="button">
          Container
        </button>
        <button onClick={() => addBox()} type="button">
          Box
        </button>
      </>
    );
  };

  render() {
    const { container } = this.props || {};
    const { type, items } = container;
    if (type !== 'container') throw Error(`Expected a container type`);
    const children = this.getChildren(items);
    return (
      <div className={s.root}>
        {children && [...children]}
        <Tooltip body={this.getTooltipBody()} width={100} height={72} space={8}>
          <div className={s.labelAdd}>Add</div>
        </Tooltip>
      </div>
    );
  }
}

export default Container;
