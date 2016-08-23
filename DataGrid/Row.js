import React, { PropTypes } from 'react';
import Component from '../AbstractComponent';
import Cell from './Cell';
import classNames from 'classnames';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Row extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      renderHeaderCell: PropTypes.func,
      renderCell: PropTypes.func,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string
    })).isRequired,
    rowData: PropTypes.object.isRequired,
  };

  state = {
    highlight: false
  };

  handleHighlight() {
    this.setState({highlight: !this.state.highlight});
  }

  render() {
    const {columns, rowData} = this.props;
    const {highlight} = this.state;

    return (
      <div className={classNames('data-grid-body-row', {highlight})}
           onMouseEnter={this.handleHighlight}
           onMouseLeave={this.handleHighlight}
      >
        {columns.map((col, index)=>(
          <Cell cellData={rowData[col.key]}
                column={col}
                key={index}
                rowData={rowData}
          />
        ))}
      </div>
    );
  }

}

export default Row;
