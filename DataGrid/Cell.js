import React, { PropTypes } from 'react';
import Component from '../AbstractComponent';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Cell extends Component {
  static propTypes = {
    cellData: PropTypes.any,
    column: PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      renderHeaderCell: PropTypes.func,
      renderCell: PropTypes.func,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string
    }),
    rowData: PropTypes.object
  };

  render() {
    const {cellData, rowData, column} = this.props;
    return (
      <div className={classNames('data-grid-body-row-cell', column.cellClassName)}>
        {column.renderCell ? column.renderCell(cellData, column, rowData) : JSON.stringify(cellData)}
      </div>
    );
  }

}

export default Cell;
