// @flow

import * as React from 'react';
import s from './Box.scss';

export type BoxT = {
  type: 'box',
  color: string,
};

type Props = {
  box: BoxT,
};

const Box = (props: Props) => {
  const { box } = props || {};
  return <div className={s.root} />;
};

export default Box;
