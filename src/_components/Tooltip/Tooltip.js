// @flow
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from 'react';
import Portal from '_components/Portal';
import s from './Tooltip.scss';

type Props = {
  children: React.Element<*>,
  width: number,
  height: number,
  space: number,
};
type State = {
  isVisible: boolean,
};

export default class Tooltip extends React.PureComponent<Props, State> {
  ref: ?HTMLElement;
  state: State = {
    isVisible: false,
  };

  calculatePosition = () => {
    const { width, height, space } = this.props;
    const style = { width, height };
    const dimensions = this.ref.getBoundingClientRect();
    style.left = dimensions.left + dimensions.width / 2 - width / 2;
    style.left = Math.max(space, style.left);
    style.left = Math.min(style.left, document.body.clientWidth - width - space);
    style.top = dimensions.top + dimensions.height + space;
    return style;
  };

  toogleTooltip = (value: boolean) => {
    this.setState({ isVisible: value });
  };

  render() {
    const { children } = this.props;
    const { isVisible } = this.state;
    return (
      <>
        <span onMouseOver={() => this.toogleTooltip(true)} ref={ref => (this.ref = ref)}>
          {children}
        </span>
        {isVisible && (
          <Portal>
            <div className={s.root} style={this.calculatePosition()}>
              <button
                className={s.cancelBtn}
                onClick={() => this.toogleTooltip(false)}
                type="button"
              >
                x
              </button>
              <button type="button">Container</button>
              <button type="button">Box</button>
            </div>
          </Portal>
        )}
      </>
    );
  }
}
