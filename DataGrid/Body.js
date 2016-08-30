import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Component from '../AbstractComponent';
import Row from './Row';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Body extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      renderHeaderCell: PropTypes.func,
      renderCell: PropTypes.func,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string
    })).isRequired,
    dataSource: PropTypes.array.isRequired,
    bodyWidth: PropTypes.number,
    selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
    setNextSiblingLeft: PropTypes.func,
    stripedRows: PropTypes.bool
  };

  static defaultProps = {
    stripedRows: false
  };

  rows = {};

  updateRowCellWidth(index, width) {
    Object.keys(this.rows).forEach(key => {
      try {
        let node = findDOMNode(this.rows[key].getNode(index));
        node.style.flexBasis = `${width}px`;
      } catch (e) {
      }
    });
  }

  render() {
    const {columns, dataSource, stripedRows, selectable, bodyWidth} = this.props;
    return (
      <div className="data-grid-body">
        {dataSource.map((row, index)=>(
          <Row className={stripedRows && index % 2 === 0 ? 'data-grid-body-row-striped' : null}
               columns={columns}
               key={index}
               ref={row => this.rows[`${index}`] = row}
               rowData={row}
               rowWidth={bodyWidth}
               selectable={selectable}
          />
        ))}
      </div>
    );
  }
}

export default Body;
