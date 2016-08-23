import React, { PropTypes } from 'react';
import AbstractFormComponent from './AbstractFormComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Input extends AbstractFormComponent {

  getValue(): null {
    return super.getValue();
  }

  valid() {
    return super.valid();
  }

  render() {
    return (
      <input {...this.props}/>
    );
  }

}

export default Input;
