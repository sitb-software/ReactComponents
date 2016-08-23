import React, {
  PropTypes
} from 'react';
import Component from '../AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Table extends Component {

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className, children, ...other} = this.props;
    return (
      <table {...other}
        className={classNames('table', className)}
      >
        {children}
      </table>
    );
  }

}

export default Table;
