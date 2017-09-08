import * as React from 'react';
import Component from '../AbstractComponent';

export interface Props {
  className?: string,
}

export default class Menu extends Component<Props, any> {

  render() {
    return (
      <div className={this.getClassName('menu')}>

      </div>
    );
  }

}
