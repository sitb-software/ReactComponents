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
    selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
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
    if (selectable !== 'none') {
      const col = {
        cellClassName: 'data-grid-checkbox',
        renderCell: () => (<input type="checkbox"/>)
      };
      return (
        <Cell cellData=""
              column={col}
              rowData={{}}
        />
      );
    }
    return null;
  }

  render() {
    const {columns, rowData, className, rowWidth, selectable, style} = this.props;
    const {highlight} = this.state;
    let length = columns.length;
    if (selectable !== 'none') {
      length += 1;
    }

    const width = rowWidth / length;

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
                style={{flexBasis: width}}
          />
        ))}
      </div>
    );
  }

}

export default Row;
