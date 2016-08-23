import { Component } from 'react';

const excludeFunc = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

/**
 * 1、实现自动绑定
 *
 * @author Sean sean.snow@live.com
 */
class AbstractComponent extends Component {

  constructor(props, context) {
    super(props, context);
    let propertyNames = Reflect.ownKeys(Reflect.getPrototypeOf(this));
    propertyNames.forEach(func => {
      if (!excludeFunc.includes(func) && typeof this[func] === 'function') {
        this[func] = this[func].bind(this);
      }
    });
  }

}

export default AbstractComponent;
