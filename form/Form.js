import React from 'react';
import { findDOMNode } from 'react-dom';
import Component from '../AbstractComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/1
 */
class Form extends Component {

  getFormValue() {
    let form = findDOMNode(this);
    let value = {};
    Object.keys(form).forEach(key => {
      let comp = form[key];
      if (/^[0-9]*$/.test(key) && comp.name) {
        value[comp.name] = comp.value;
      }
    });
    return value;
  }

  getFormData() {
    let data = new FormData();
    let value = this.getFormValue();
    Object.keys(value).forEach(key=> {
      data.append(key, value[key]);
    });
    return data;
  }

  render() {
    const {children, ...other} = this.props;
    return (
      <form {...other}>
        {children}
      </form>
    );
  }

}

export default Form;
