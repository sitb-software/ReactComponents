import React, {
  PropTypes,
  cloneElement
} from 'react';
import Component from '../AbstractComponent';
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Header extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      renderHeaderCell: PropTypes.func,
      sortable: PropTypes.bool
    }))
  };

  shouldComponentUpdate() {
    return false;
  }

  renderHeaderCell(col, index) {
    const {label, renderHeaderCell} = col;
    if (renderHeaderCell) {
      return cloneElement(renderHeaderCell(col), {
        key: index
      });
    }
    return (
      <div className="data-grid-header-cell"
           key={index}
      >
        {label}
      </div>
    );
  }

  render() {
    const {columns} = this.props;
    return (
      <header className="data-grid-header">
        {columns.map((col, index)=>this.renderHeaderCell(col, index))}
      </header>
    );
  }

}

export default Header;
