import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

const defaultProps = {
  initialPage: 1,
  pageSize: 10
}

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pager: {} }
  }

  UNSAFE_componentWillMount() {
    var pager = this.state.pager
    pager = this.getPager(this.props.currentPage, this.props.numberOfPages, this.props.pageSize)
    this.setState({ pager: pager })
  }

  setPage(page) {
    var { pageSize } = this.props
    var pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    } else {
      this.setState({ pager: this.getPager(page, pager.totalPages, pager.pageSize) })
    }

    this.props.onChangePage(page, pageSize)
  }

  getPager(currentPage, numberOfPages, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 10

    // calculate total pages
    var totalPages = numberOfPages

    var startPage, endPage

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    }
  }

  render() {
    var pager = this.state.pager

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
      <ul className="pagination justify-content-center">
        <li className={`page-item arrow ${pager.currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>
          <i className="fas fa-angle-left"></i> Anterior
          </button>
        </li>

        {pager.pages.map((page, index) => (
          <li key={index} className={`page-item ${pager.currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => this.setPage(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item arrow ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>
          Próxima <i className="fas fa-angle-right"></i> 
          </button>
        </li>
      </ul>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps
export default Pagination
