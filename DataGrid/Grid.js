import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Component from '../AbstractComponent';
import classNames from 'classnames';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Grid extends Component {
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
    })),
    dataSource: PropTypes.array,
    first: PropTypes.bool,
    last: PropTypes.bool,
    maxPageBtn: PropTypes.number,
    pageNumber: PropTypes.number,
    /**
     * 分页大小 page size
     */
    pageSize: PropTypes.number,

    renderHeader: PropTypes.func,
    selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
    /**
     * 是否显示分页信息
     */
    showPage: PropTypes.bool,
    /**
     * 条纹表格
     */
    stripedRows: PropTypes.bool,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func
  };

  static defaultProps = {
    dataSource: [],
    selectable: 'none'
  };

  state = {
    gridWidth: 0
  };

  // refs
  body;

  componentDidMount() {
    let node = findDOMNode(this);
    this.updateGridWidth(node.offsetWidth);
  }

  updateGridWidth(gridWidth) {
    this.setState({gridWidth});
  }

  updateBodyWidth(bodyWidth) {
    let body = findDOMNode(this.body);
    body.style.width = `${bodyWidth}px`;
  }

  updateBodyCellWidth(index, width) {
    this.body.updateRowCellWidth(index, width);
  }

  setNextSiblingLeft(node, move) {
    if (node.nextSibling) {
      let nextNode = node.nextSibling;
      nextNode.style.left = `${nextNode.offsetLeft + move}px`;
      this.setNextSiblingLeft(nextNode, move);
    }
  }

  renderHeader() {
    const {columns, selectable} = this.props;
    return (
      <Header bodyWidth={this.state.gridWidth}
              columns={columns}
              selectable={selectable}
              updateBodyCellWidth={this.updateBodyCellWidth}
              updateBodyWidth={this.updateBodyWidth}
      />
    );
  }

  render() {
    const {
      className,
      columns,
      renderHeader,
      dataSource,
      first,
      last,
      maxPageBtn,
      pageNumber,
      pageSize,
      totalPages,
      showPage,
      onPageChange,
      stripedRows,
      selectable,
      ...other
    } = this.props;
    return (
      <div {...other}
        className={classNames('data-grid', className)}
      >
        {renderHeader ? renderHeader() : this.renderHeader()}
        <Body bodyWidth={this.state.gridWidth}
              columns={columns}
              dataSource={dataSource}
              ref={body => this.body = body}
              selectable={selectable}
              setNextSiblingLeft={this.setNextSiblingLeft}
              stripedRows={stripedRows}
        />
        <Footer first={first}
                last={last}
                maxPageBtn={maxPageBtn}
                onPageChange={onPageChange}
                pageNumber={pageNumber}
                pageSize={pageSize}
                showPage={showPage}
                totalPages={totalPages}
        />
      </div>
    );
  }
}

export default Grid;
