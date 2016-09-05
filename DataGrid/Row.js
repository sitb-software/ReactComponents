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
      resizable: PropTypes.bool,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string,
      width: PropTypes.number
    })).isRequired,
    rowData: PropTypes.object.isRequired,
    rowWidth: PropTypes.number,
    selectable: PropTypes.oneOf(['none', 'single', 'multiple'])
  };

  state = {
    highlight: false
  };

  cells = {};

  getNode(index) {
    return this.cells[`${index}`];
  }

  handleHighlight() {
    this.setState({highlight: !this.state.highlight});
  }

  renderSelectable() {
    const {selectable} = this.props;
    let result = null;
    let col = {
      cellClassName: 'data-grid-checkbox'
    };
    switch (selectable) {
      case 'single':
        col.renderCell = () => (
          <input name="signle-check"
                 type="radio"
          />
        );
        result = (
          <Cell cellData=""
                column={col}
                rowData={{}}
          />
        );
        break;
      case 'multiple':
        col.renderCell = () => (<input type="checkbox"/>);
        result = (
          <Cell cellData=""
                column={col}
                rowData={{}}
          />
        );
        break;
      default:
        break;
    }
    return result;
  }

  render() {
    const {columns, rowData, className, rowWidth, selectable, style} = this.props;
    const {highlight} = this.state;
    let length = columns.length;
    if (selectable !== 'none') {
      length += 1;
    }

    let newRowWidth = rowWidth;
    columns.forEach(col => {
      if (col.width) {
        length -= 1;
        newRowWidth -= col.width;
      }
    });

    const width = newRowWidth / length;

    return (
      <div className={classNames('data-grid-row', className, {highlight})}
           onMouseEnter={this.handleHighlight}
           onMouseLeave={this.handleHighlight}
           style={[{flexBasis: rowWidth}, style]}
      >
        {this.renderSelectable()}
        {columns.map((col, index)=>(
          <Cell cellData={rowData[col.key]}
                column={col}
                key={index}
                ref={cell => this.cells[`${index}`] = cell}
                rowData={rowData}
                style={{flexBasis: col.width || width}}
          />
        ))}
      </div>
    );
  }

}

export default Row;
