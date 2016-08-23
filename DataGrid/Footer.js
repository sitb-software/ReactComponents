import React, { PropTypes } from 'react';
import Component from '../AbstractComponent';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/23
 */
class Footer extends Component {

  static propTypes = {
    first: PropTypes.bool,
    last: PropTypes.bool,
    maxPageBtn: PropTypes.number,
    /**
     * 当前页
     */
    pageNumber: PropTypes.number,
    /**
     * 分页大小 page size
     */
    pageSize: PropTypes.number,
    /**
     * 是否显示分页信息
     */
    showPage: PropTypes.bool,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func
  };

  onPageChange(number) {
    return () => {
      console.log(number);
      const {onPageChange} = this.props;
      onPageChange && onPageChange(number);
    };
  }

  renderPageNav() {
    const {
      first,
      last,
      pageNumber,
      maxPageBtn,
      totalPages
    } = this.props;
    let pages = [];
    let startPage: Number,
      endPage: Number,
      hasHiddenPagesAfter;
    let hiddenPagesBefore = pageNumber - parseInt(maxPageBtn / 2);
    startPage = hiddenPagesBefore > 0 ? hiddenPagesBefore : 0;
    hasHiddenPagesAfter = startPage + maxPageBtn <= totalPages;
    if (hasHiddenPagesAfter) {
      endPage = startPage + maxPageBtn - 1;
    } else {
      endPage = totalPages;
      startPage = totalPages - maxPageBtn + 1;
      if (startPage < 0) {
        startPage = 0;
      }
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <li className={pageNumber === i ? 'active' : ''}
            key={i}
        >
          <a onClick={pageNumber === i ? null : this.onPageChange(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    return (
      <ul className="pagination">
        <li className={first ? 'disabled' : 'previous'}>
          <a onClick={this.onPageChange(pageNumber - 1)}>
            <span>{'<<'}</span>
          </a>
        </li>
        {pageNumber - maxPageBtn / 2 - 1 > 0 ? (
          <li className="disabled"><a>{'...'}</a></li>
        ) : null}
        {pages}
        {totalPages - pageNumber > maxPageBtn / 2 - 1 ? (
          <li className="disabled"><a>{'...'}</a></li>
        ) : null}
        <li className={last ? 'disabled' : 'next'}>
          <a onClick={last ? null : this.onPageChange(pageNumber + 1)}>
            <span>{'>>'}</span>
          </a>
        </li>
      </ul>
    );
  }

  render() {
    const {showPage, children} = this.props;
    return (
      <div className="data-grid-footer">
        {children}
        {showPage ? this.renderPageNav() : null}
      </div>
    );
  }
}

export default Footer;
