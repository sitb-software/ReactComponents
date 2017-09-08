import * as React from 'react';
import PropTypes from 'prop-types';

export default class ThemeProvider extends React.Component<any, any> {

  static childContextTypes = {
    classPrefix: PropTypes.string.isRequired,
    styles: PropTypes.object
  };

  getChildContext() {
    return {
      classPrefix: 'rn-',
      styles: {}
    };

  }

  render() {
    return this.props.children;
  }

}
