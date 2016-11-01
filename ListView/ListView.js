import React, {
  PropTypes,
  cloneElement
} from 'react';
import { findDOMNode } from 'react-dom';
import Component from '../AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/30
 */
class ListView extends Component {

  static propTypes = {
    renderRow: PropTypes.func.isRequired,
    dataSource: PropTypes.array,
    horizontal: PropTypes.bool,
    refreshControl: PropTypes.element,
    renderHeader: PropTypes.func,
    onRefresh: PropTypes.func
  };

  static defaultProps = {
    dataSource: [],
    horizontal: false
  };

  state = {
    refreshState: 'hide'
  };

  // refs
  control;

  offset = 70;
  startY;
  endY;
  isCanDo = false;
  isLock = false;
  // 是否为拉起
  isPullUp = false;

  componentDidMount() {
    let node = findDOMNode(this);
    node.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    let node = findDOMNode(this);
    node.removeEventListener('scroll', this.handleScroll);
  }

  setTransition(element, time) {
    let value = `all ${time}s`;
    element.style.webkitTransition = value;
    element.style.transition = value;
  }

  setTranslate(element, diff) {
    let value = `translate(0, ${diff}px`;
    element.style.webkitTransform = value;
    element.style.transform = value;
  }

  setBack(element) {
    this.setTranslate(element, 0 - this.offset);
    this.isLock = false;
  }

  handleStartPull(e) {
    let thisNode = findDOMNode(this);
    if (thisNode.scrollTop <= 0 && !this.isLock) {
      this.isLock = true;
      this.isCanDo = true;
      let touch = e.touches[0];
      this.startY = touch.pageY;
      this.setTransition(thisNode, 0);
    }

  }

  handlePull(e) {
    let thisNode = findDOMNode(this);

    if (thisNode.scrollTop <= 0 && this.isCanDo) {
      let touch = e.touches[0];
      this.endY = touch.pageY;
      if (this.startY < this.endY) {
        e.preventDefault();
        this.setTransition(thisNode, 0);
        this.setTranslate(thisNode, this.endY - this.startY - this.offset);
      }
    }
    // let touch = e.touches[0];
    // this.isPullUp = this.currentY > touch.pageY;
    // console.log(`pull ${this.isPullUp ? 'up' : 'down'}`);
  }

  handleEndPull() {
    if (this.isCanDo) {
      let thisNode = findDOMNode(this);
      this.isCanDo = false;
      if (this.endY - this.startY >= this.offset) {
        this.setTransition(thisNode, 1);
        this.setTranslate(thisNode, 0);
      } else {
        this.setBack(thisNode);
      }
    }
  }

  handleScroll(e) {
    console.log(e);
  }

  render() {
    const {className, dataSource, renderRow, horizontal, refreshControl} = this.props;
    const directionClassName = horizontal ? 'list-view-horizontal' : 'list-view-vertical';
    return (
      <div className={classNames('list-view', directionClassName, className)}
           onScroll={this.handleScroll}
      >
        {refreshControl && cloneElement(refreshControl, {
          state: this.state.refreshState,
          ref: control => this.control = control
        })}
        {dataSource.map((item, index) => (
          <div className="list-view-row"
               key={`list_view_item_${index}`}
          >
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    );
  }

}

export default ListView;
