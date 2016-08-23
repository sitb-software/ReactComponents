import React from 'react';
import Component from '../AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Tbody extends Component {

  render() {
    const {className, children, ...other} = this.props;
    return (
      <tbody {...other}
        className={classNames('tbody', className)}
      >
      {children}
      </tbody>
    );
  }

}

export default Tbody;
