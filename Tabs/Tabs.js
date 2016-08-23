import React, {
  Children,
  isValidElement,
  PropTypes
} from 'react';
import Component from '../AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/22
 */
class Tabs extends Component {

  static propTypes = {
    activeTab: PropTypes.string,
    /**
     * tabs class
     */
    className: PropTypes.string,
    /**
     * tab label
     */
    label: PropTypes.string,
    renderTabBar: PropTypes.func,
    onTabChange: PropTypes.func
  };

  state: Object;

  tabs: Object;

  constructor(props, context) {
    super(props, context);
    this.tabs = this.getTabs(props.children);
    this.state = {
      activeTab: props.activeTab || Object.keys(this.tabs)[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.tabs = this.getTabs(nextProps.children);
  }

  getTabs(children) {
    let tabs = {};
    Children.forEach(children, (tab)=> {
      if (isValidElement(tab) && tab.props.label) {
        tabs[tab.props.label] = tab;
      }
    });
    return tabs;
  }

  goTab(tab) {
    return () => this.handleTabChange(tab);
  }

  handleTabChange(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
      const {onTabChange} = this.props;
      if (onTabChange) {
        onTabChange(tab);
      }
    }
  }

  renderTabBar(tabs, active) {
    const {renderTabBar} = this.props;
    if (renderTabBar) {
      return renderTabBar(tabs, active);
    }
    return (
      <div className="tabBar">
        {tabs.map((tab, index) => (
          <div className={classNames('tab', {active: active === tab})}
               key={index}
               onTouchTap={this.goTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {className} = this.props;
    return (
      <div className={classNames('tabs', className)}>
        {this.renderTabBar(Object.keys(this.tabs), this.state.activeTab)}
        <div className="tabContent">
          {this.tabs[this.state.activeTab]}
        </div>
      </div>
    );
  }

}

export default Tabs;
