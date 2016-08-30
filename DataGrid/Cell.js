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

  getCellValue(cellData) {
    return typeof cellData === 'string' ? cellData : JSON.stringify(cellData);
  }

  render() {
    const {cellData, rowData, column, ...other} = this.props;
    return (
      <div {...other}
        className={classNames('data-grid-cell', column.cellClassName)}
      >
        <div className="data-grid-cell-data">
          {column.renderCell ? column.renderCell(cellData, column, rowData) : this.getCellValue(cellData)}
        </div>
        <label className="data-grid-label"/>
      </div>
    );
  }

}

export default Cell;
