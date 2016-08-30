import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Component from '../AbstractComponent';
import classNames from 'classnames';
/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Header extends Component {

  static propTypes = {
    bodyWidth: PropTypes.number,
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      renderHeaderCell: PropTypes.func,
      renderCell: PropTypes.func,
      resizable: PropTypes.bool,
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string,
      width: PropTypes.number
    })),
    selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
    updateBodyCellWidth: PropTypes.func,
    updateBodyWidth: PropTypes.func
  };

  // refs
  cells = {};

  canDragging = false;
  currentCellIndex;
  currentClientX;
  width = 0;
  addWidth = 0;

  componentDidMount() {
    if (global.window.addEventListener) {
      global.document.addEventListener('mousemove', this.handleLabelMove);
      global.document.addEventListener('mouseup', this.handleLabelMouseUp);
    } else {
      global.window.attachEvent('onmousemove', this.handleLabelMove);
      global.window.attachEvent('onmousemove', this.handleLabelMouseUp);
    }
  }

  handleLabelMove(e) {
    if (this.canDragging) {
      let node = findDOMNode(this.cells[`${this.currentCellIndex}`]);
      let move = e.clientX - this.currentClientX;
      let width = move + node.offsetWidth;
      this.addWidth = move;
      this.currentClientX = e.clientX;
      node.style.flexBasis = `${width}px`;
      this.width = width;
    }
  }

  handleLabelMouseUp() {
    this.canDragging = false;
    let node = findDOMNode(this);
    let newBodyWidth = node.scrollWidth + this.addWidth;
    node.style.flexBasis = `${newBodyWidth}px`;
    this.props.updateBodyWidth(newBodyWidth);
    this.props.updateBodyCellWidth(this.currentCellIndex, this.width);
  }

  handleLabelMouseDown(index) {
    return (e) => {
      this.canDragging = true;
      this.currentClientX = e.clientX;
      this.currentCellIndex = index;
    };
  }

  renderHeaderCell(col, index, defaultWidth) {
    const {label, renderHeaderCell, resizable, width} = col;
    return (
      <div className="data-grid-cell"
           key={`cell_${index}`}
           ref={cell => this.cells[`${index}`] = cell}
           style={{flexBasis: width || defaultWidth}}
      >
        <div className="data-grid-cell-data">
          {renderHeaderCell ? renderHeaderCell(col) : label}
        </div>
        <label className={classNames('data-grid-label', {move: resizable})}
               key={`label_${index}`}
               onMouseDown={resizable ? this.handleLabelMouseDown(index) : null}
        />
      </div>
    );
  }

  renderSelectable() {
    const {selectable} = this.props;
    if (selectable === 'none') {
      return null;
    }
    return (
      <div className="data-grid-cell data-grid-checkbox"
           key="selectable"
      >
        <input type="checkbox"/>
        <label className="data-grid-label"/>
      </div>
    );
  }

  render() {
    const {columns, bodyWidth, selectable, style} = this.props;
    let length = columns.length;
    if (selectable !== 'none') {
      length += 1;
    }
    let newBodyWidth = bodyWidth;
    columns.forEach(col => {
      if (col.width) {
        length -= 1;
        newBodyWidth -= col.width;
      }
    });
    const width = newBodyWidth / length;
    return (
      <header className="data-grid-header"
              style={[{flexBasis: bodyWidth}, style]}
      >
        {this.renderSelectable()}
        {columns.map((col, index)=>this.renderHeaderCell(col, index, width))}
      </header>
    );
  }

}

export default Header;
