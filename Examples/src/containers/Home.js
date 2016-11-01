import React from 'react';
import Component from 'react-components/AbstractComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/24
 */
class Home extends Component {

  render() {
    return (
      <ul>
        <li><a href="/data-grid">{'DataGrid Component'}</a></li>
        <li><a href="/form">{'Form Component'}</a></li>
      </ul>
    );
  }

}

export default Home;
