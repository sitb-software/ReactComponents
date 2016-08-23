import React, { PropTypes } from 'react';
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
    dataSource: PropTypes.array.isRequired
  };

  render() {
    const {columns, dataSource} = this.props;
    return (
      <div className="data-grid-body">
        {dataSource.map((row, index)=>(
          <Row columns={columns}
               key={index}
               rowData={row}
          />
        ))}
      </div>
    );
  }
}

export default Body;
