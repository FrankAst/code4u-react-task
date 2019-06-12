// @flow

import * as React from 'react';
import { observer } from 'mobx-react';
import { ChromePicker } from 'react-color';
import Portal from '_components/Portal';
import type { BoxT } from 'store';
import s from './Box.scss';

type Props = {
  box: BoxT,
};

type State = {
  isShowColorPicker: boolean,
};

@observer
class Box extends React.PureComponent<Props, State> {
  boxRef: ?HTMLElement;
  state: State = {
    isShowColorPicker: false,
  };

  toggleColorPicker = (): void => {
    const { isShowColorPicker } = this.state;
    this.setState({ isShowColorPicker: !isShowColorPicker });
  };

  calcPositionColorPicker = (): Object => {
    const width = 250;
    const height = 250;
    const space = 16;
    const style = { width, height };
    const dimensions = this.boxRef.getBoundingClientRect();
    style.left = dimensions.left + dimensions.width / 2 - width / 2;
    style.left = Math.max(space, style.left);
    style.left = Math.min(style.left, document.body.clientWidth - width - space);
    style.top = dimensions.top + dimensions.height + space;
    return style;
  };

  onChangeColor = (color: Object): void => {
    const { box } = this.props || {};
    box.changeColor(color.hex);
  };

  render() {
    const { box } = this.props || {};
    const { isShowColorPicker } = this.state;
    if (box?.type !== 'box') throw new Error('Expected a box type');
    const applyColorStyle = { backgroundColor: box.color };

    return (
      <>
        <div
          className={s.root}
          onClick={this.toggleColorPicker}
          ref={ref => (this.boxRef = ref)}
          style={applyColorStyle}
        />
        {isShowColorPicker && (
          <Portal>
            <div className={s.colorPicker} style={this.calcPositionColorPicker()}>
              <ChromePicker color={box.color} onChangeComplete={this.onChangeColor} />
            </div>
          </Portal>
        )}
      </>
    );
  }
}

export default Box;
