import React, {
  PropTypes,
  Children,
  cloneElement
} from 'react';
import { findDOMNode } from 'react-dom';
import Component from './AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Swiper extends Component {

  static propTypes = {
    autoPlay: PropTypes.number,
    direction: PropTypes.oneOf(['horizontal', 'vertical'])
  };

  static defaultProps = {
    autoPlay: null,
    direction: 'horizontal'
  };
  state = {
    style: {}
  };

  // refs
  items: Object;

  autoPlayTask;
  activeItem = 0;
  translate = {
    x: 0,
    y: 0,
    z: 0
  };

  componentDidMount() {
    this.handleAutoPlay();
  }

  componentWillUnmount() {
    this.autoPlayTask && clearInterval(this.autoPlayTask);
  }

  handleAutoPlay() {
    const {autoPlay, direction} = this.props;
    if (autoPlay && autoPlay > 0) {
      this.autoPlayTask = setInterval(()=> {
        let nextItem = this.activeItem + 1;
        if (!this.items[`${nextItem}`]) {
          nextItem = 0;
        }
        let domNode = findDOMNode(this.items[`${nextItem}`]);
        const {offsetWidth} = domNode;
        if (direction === 'horizontal') {
          this.translate.x += offsetWidth;
        }
        let style = {
          transform: `translate3d(${this.translate.x}, ${this.translate.y}, ${this.translate.z})`
        };
        this.activeItem = nextItem;
        this.setState({style});
      }, autoPlay);
    }
  }

  getChildren(children) {
    this.items = {};
    return Children.map(children, (child, index)=> cloneElement(child, {
      key: index,
      className: classNames('swiper-item', child.props.className),
      ref: ref => {
        this.items[`${index}`] = ref;
        child.props.ref && child.props.ref(ref);
      }
    }));
  }

  render() {
    const {children, className, direction, style, ...other} = this.props;
    return (
      <div {...other}
        className={classNames('swiper', `swiper-${direction}`, className)}
        style={[style, this.state.style]}
      >
        {this.getChildren(children)}
      </div>
    );
  }

}

export default Swiper;
