import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getUserList } from '../user/userActions'
import { getProcessList, getProcessFilters, setProcessFilters } from './processActions'
import Spinner from '../common/Spinner'
import Pagination from '../common/Pagination'
import DrawFilter from 'components/profile/DrawFilter'
import FilterFieldGroup from 'components/common/FilterFieldGroup'
import { buildFilterStrings } from 'utils/buildFilterOptions'
import { isEmpty } from 'validation'
import ProcessFilters from './ProcessFilters'

class ProcessList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //processes state
      pageOfItems: [],

      filters: {},

      //error state
      errors: {}
    }

    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.getProcessList({ ...buildFilterStrings(this.props.filters) })
    } else {
      this.props.getProcessList({ ...buildFilterStrings(this.props.filters) })
    }

    //load filters only if dont have yet
    if (isEmpty(this.props.filters)) {
      this.props.getProcessFilters()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    this.props.getProcessList({ page: page, limit: pageSize, ...buildFilterStrings(this.props.filters) })
  }

  markFilterV2 = (id, item) => {
    //Mark filter on object
    let list = JSON.parse(JSON.stringify(this.props.filters[id]))
    let registro = list.find(it => {
      return it.value === item
    })
    registro.marked = !registro.marked
    let filters = JSON.parse(JSON.stringify(this.props.filters))
    filters[id] = list
    this.props.setProcessFilters(filters)

    //apply marked filters
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = filters[index]
      filter.map(item => {
        item.applied = item.marked
        return null
      })
    }

    this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) })
    this.props.setProcessFilters(filters)
  }

  clearFiltersV2 = e => {
    e.preventDefault()

    //let filters = this.state.filters;
    let filters = JSON.parse(JSON.stringify(this.props.filters))
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = filters[index]
      filter.map(item => {
        item.marked = false
        item.applied = false
        return null
      })
    }
    this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) })
    this.props.setProcessFilters(filters)
  }

  markFilter = (id, item) => {
    //let list = this.state.filters[id];
    let list = JSON.parse(JSON.stringify(this.props.filters[id]))

    let registro = list.find(it => {
      return it.value === item
    })
    registro.marked = !registro.marked

    let filters = JSON.parse(JSON.stringify(this.props.filters))
    filters[id] = list
    //this.setState({ filters: filters });
    this.props.setProcessFilters(filters)
  }

  removeFilter = (id, item) => {
    //let list = this.state.filters[id];
    let list = JSON.parse(JSON.stringify(this.props.filters[id]))

    let registro = list.find(it => {
      return it.value === item
    })
    registro.marked = false
    registro.applied = false

    let filters = JSON.parse(JSON.stringify(this.props.filters))
    filters[id] = list
    // this.setState({ filters: filters }, () => {
    //   this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) });
    // });
    this.props.setProcessFilters(filters)
    this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) })
  }

  applyFilters = e => {
    e.preventDefault()

    let filters = JSON.parse(JSON.stringify(this.props.filters))
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = filters[index]
      filter.map(item => {
        item.applied = item.marked
        return null
      })
    }

    // this.setState({ filters: filters }, () => {
    //   this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) });
    // });
    this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) })
    this.props.setProcessFilters(filters)
    this.refs.filterButton.click()
  }

  clearFilters = e => {
    e.preventDefault()

    //let filters = this.state.filters;
    let filters = JSON.parse(JSON.stringify(this.props.filters))
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = filters[index]
      filter.map(item => {
        item.marked = false
        item.applied = false
        return null
      })
    }

    // this.setState({ filters: filters }, () => {
    //   this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(this.state.filters) });
    // });
    this.props.getProcessList({ page: 1, limit: 10, ...buildFilterStrings(filters) })
    this.props.setProcessFilters(filters)
    this.refs.filterButton.click()
  }

  cancelFilters = e => {
    e.preventDefault()

    //let filters = this.state.filters;
    let filters = JSON.parse(JSON.stringify(this.props.filters))
    let indexes = Object.keys(filters)

    for (let index of indexes) {
      let filter = filters[index]
      filter.map(item => {
        item.marked = item.applied
        return null
      })
    }

    //this.setState({ filters: filters });

    this.props.setProcessFilters(filters)
    this.refs.filterButton.click()
  }

  renderAdd() {
    return (
      <React.Fragment>
        <DrawFilter permission="selectiveprocess_create" anyCourse={true}>
          <Link className="text-success" to={`${this.props.match.url}/create`}>
            <i className="fas fa-plus-circle" /> Adicionar
          </Link>
        </DrawFilter>
      </React.Fragment>
    )
  }

  renderTable(processes) {
    return (
      <React.Fragment>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Número/Ano</th>
              <th>Nível</th>
              <th>Curso</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {processes.selectiveProcesses.map(process => {
              return (
                <tr key={process.id} className={process.visible ? '' : 'text-black-50'}>
                  <td>
                    <Link to={`${this.props.match.url}/${process.id}`}>
                      {process.number}/{process.year}
                    </Link>
                  </td>
                  <td>{process.Course.GraduationType ? process.Course.GraduationType.name : '-'}</td>
                  <td>{process.Course.name}</td>
                  <td className="text-right">
                    <Link className="text-info" to={`/processes/${process.id}`}>
                      <i className="fas fa-search-plus" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {this.renderPagination(processes)}
      </React.Fragment>
    )
  }

  renderProcesses(processes) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Resultados</h4>
            </div>
            <div className="col text-right">{this.renderAdd()}</div>
          </div>
        </div>
        <div className="card-body">
          {processes.selectiveProcesses.length > 0 ? (
            this.renderTable(processes)
          ) : (
            <p className="m-0">Sem resultados para exibir.</p>
          )}
        </div>
      </div>
    )
  }

  renderPagination(processes) {
    return (
      <Pagination
        currentPage={processes.info.currentPage}
        numberOfPages={processes.info.numberOfPages}
        onChangePage={this.onChangePage}
      />
    )
  }

  render() {
    const { processes, loading } = this.props.processStore
    //const { filters } = this.state;
    const { filters } = this.props

    const renderFilterBadges = filters => {
      //console.log(" renderBadges filters:", filters);

      let indexes = Object.keys(filters)

      let resultFilters = []

      for (let index of indexes) {
        let filter = filters[index]
        let resultFilter = filter
          .filter(it => {
            return it.applied === true
          })
          .map((item, key) => {
            return (
              <span key={key} className="badge badge-info mr-1">
                {item.label}{' '}
                <i
                  onClick={() => {
                    this.removeFilter(index, item.value)
                  }}
                  className="fas fa-times-circle"
                  style={{ cursor: 'pointer' }}
                />
              </span>
            )
          })
        resultFilters.push(resultFilter)
      }

      return resultFilters
    }

    const filterBox = (
      <div className="card mb-2">
        <div className="card-header">
          <button
            ref="filterButton"
            className="btn btn-info mr-2"
            type="button"
            data-toggle="collapse"
            data-target="#collapse1"
            aria-expanded="false"
            aria-controls="collapse1">
            <i className="fas fa-filter" />
          </button>

          {renderFilterBadges(filters)
            .map(filter => {
              return filter
            })
            .map(item => {
              return item
            })}
        </div>

        <div id="collapse1" className="panel-collapse collapse">
          <div className="card-body">
            <form onSubmit={this.addFilter}>
              <FilterFieldGroup id="numbers" label="Número" items={filters.numbers} onChange={this.markFilter} />
              <FilterFieldGroup id="years" label="Ano" items={filters.years} onChange={this.markFilter} />
              <FilterFieldGroup
                id="graduationTypes"
                label="Nível"
                items={filters.graduationTypes}
                onChange={this.markFilter}
              />
              <FilterFieldGroup id="courses" label="Curso" items={filters.courses} onChange={this.markFilter} />
              <FilterFieldGroup
                id="assignments"
                label="Atribuição"
                items={filters.assignments}
                onChange={this.markFilter}
              />

              <div className="d-none">
                <input
                  ref="filterSubmit"
                  type="submit"
                  onClick={this.applyFilters}
                  value="Aplicar filtros"
                  className="btn btn-info"
                />
              </div>
            </form>
          </div>

          <div className="card-footer">
            <div className="text-right">
              <input
                type="button"
                onClick={() => {
                  this.refs.filterSubmit.click()
                }}
                value="Aplicar filtros"
                className="btn btn-info ml-1  mb-1"
              />
              <input
                type="button"
                onClick={this.clearFilters}
                value="Limpar filtros"
                className="btn btn-info ml-1 mb-1"
              />
              <input type="button" onClick={this.cancelFilters} value="Cancelar" className="btn btn-info ml-1  mb-1" />
            </div>
          </div>
        </div>
      </div>
    )

    const processTable = processes === null || loading ? <Spinner /> : this.renderProcesses(processes)

    return (
      <div className="user-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Processos seletivos</h1>
              <p className="lead text-muted" />
              <ProcessFilters
                filters={this.props.filters}
                onCheckItem={this.markFilterV2}
                onSubmit={this.props.addFilter}
                onRemoveFilter={this.removeFilter}
                onClearFilters={this.clearFiltersV2}
              />
              {/* {filterBox} */}
              {processTable}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProcessList.propTypes = {
  getUserList: PropTypes.func.isRequired,
  getProcessList: PropTypes.func.isRequired,
  authStore: PropTypes.object.isRequired,
  processStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authStore: state.authStore,
  processStore: state.processStore,
  filters: state.processStore.filters
})

export default connect(
  mapStateToProps,
  { getUserList, getProcessList, getProcessFilters, setProcessFilters }
)(ProcessList)
