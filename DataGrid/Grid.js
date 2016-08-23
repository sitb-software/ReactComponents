import React, { PropTypes } from 'react';
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
      sortable: PropTypes.bool,
      cellClassName: PropTypes.string
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
    /**
     * 是否显示分页信息
     */
    showPage: PropTypes.bool,
    totalPages: PropTypes.number
  };

  static defaultProps = {
    dataSource: []
  };

  renderHeader(columns) {
    return <Header columns={columns}/>;
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
      showPage
    } = this.props;
    return (
      <div className={classNames('data-grid', className)}>
        {renderHeader ? renderHeader(columns) : this.renderHeader(columns)}
        <Body columns={columns}
              dataSource={dataSource}
        />
        <Footer first={first}
                last={last}
                maxPageBtn={maxPageBtn}
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
