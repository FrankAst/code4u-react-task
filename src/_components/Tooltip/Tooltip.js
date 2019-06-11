// @flow
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from 'react';
import Portal from '_components/Portal';
import s from './Tooltip.scss';

type Props = {
  children: React.Element<any>,
  body: React.Element<any>,
  width: number,
  height: number,
  space: number,
};
type State = {
  isVisible: boolean,
};

export default class Tooltip extends React.PureComponent<Props, State> {
  childRef: ?HTMLElement;
  hideTooltipTimerId: number;
  state: State = {
    isVisible: false,
  };

  calculatePosition = (): Object => {
    const { width, height, space } = this.props;
    const style = { width, height };
    const dimensions = this.childRef.getBoundingClientRect();
    style.left = dimensions.left + dimensions.width / 2 - width / 2;
    style.left = Math.max(space, style.left);
    style.left = Math.min(style.left, document.body.clientWidth - width - space);
    style.top = dimensions.top + dimensions.height + space;
    return style;
  };

  showTooltip = () => {
    if (this.hideTooltipTimerId) {
      clearTimeout(this.hideTooltipTimerId);
      this.hideTooltipTimerId = null;
    }
    this.setState({ isVisible: true });
  };

  hideTooltipDelayed = () => {
    this.hideTooltipTimerId = setTimeout(() => this.setState({ isVisible: false }), 1000);
  };

  render() {
    const { children, body } = this.props || {};
    const { isVisible } = this.state;
    return (
      <>
        <span
          onMouseOut={() => this.hideTooltipDelayed()}
          onMouseOver={() => this.showTooltip()}
          ref={ref => (this.childRef = ref)}
        >
          {children}
        </span>
        {isVisible && (
          <Portal>
            <div
              onMouseOver={() => this.showTooltip()}
              onMouseOut={() => this.hideTooltipDelayed()}
              className={s.root}
              style={this.calculatePosition()}
            >
              {body}
            </div>
          </Portal>
        )}
      </>
    );
  }
}
