import React, { PropTypes } from 'react';
import Component from '../AbstractComponent';
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/31
 */
class RefreshControl extends Component {

  static propTypes = {
    refreshing: PropTypes.bool,
    state: PropTypes.oneOf(['hide', 'show', 'refresh']),
    onRefresh: PropTypes.func
  };

  static defaultProps = {
    refreshing: false,
    state: 'hide'
  };

  render() {
    const {refreshing, state} = this.props;
    let content = '';
    if (refreshing) {
      content = '正在刷新...';
    } else {
      switch (state) {
        case 'show':
          content = '下拉刷新';
          break;
        case 'refresh':
          content = '松开刷新数据';
          break;
        case 'hide':
          break;
        default:
          break;
      }
    }
    let style = {
      display: refreshing ? 'block' : 'none'
    };
    return (
      <div className="refresh-control"
           style={style}
      >
        {content}
      </div>
    );
  }

}

export default RefreshControl;
