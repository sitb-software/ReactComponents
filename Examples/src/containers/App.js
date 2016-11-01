import React, { cloneElement } from 'react';
import Component from 'react-components/AbstractComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/24
 */
class App extends Component {

  render() {
    return cloneElement(this.props.children || <div />, {});
  }

}

export default App;
