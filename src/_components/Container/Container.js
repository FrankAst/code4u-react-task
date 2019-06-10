// @flow

import * as React from 'react';
import Box, { type BoxT } from '_components/Box/Box';
import Tooltip from '_components/Tooltip/Tooltip';
import s from './Container.scss';

export type ContainerT = {
  type: string,
  items: Array<BoxT | ContainerT>,
};

type Props = {
  Container: ContainerT,
};

const getChildren = (items: Array<BoxT | ContainerT>): ?Array<React.Element> => {
  if (items?.length > 0) {
    return items.map(item => {
      switch (item.type) {
        case 'box':
          return (
            <div className={s.child}>
              <Box box={item} />
            </div>
          );
        case 'container':
          return (
            <div className={s.child}>
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

const Container = (props: Props) => {
  const { container } = props || {};
  const { type, items, _id } = container;
  if (type !== 'container') throw Error(`Expected container type`);
  const children = getChildren(items);
  return (
    <div className={s.root}>
      {children && [...children]}
      <Tooltip width={100} height={72} space={8}>
        <div className={s.labelAdd}>Add</div>
      </Tooltip>
    </div>
  );
};

export default Container;
