/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getUserList } from '../user/userActions'
import { getProcessList, getProcessFilters, setProcessFilters } from './processActions'
import Spinner from '../common/Spinner'
import Pagination from '../common/Pagination'
import DrawFilter from 'components/profile/DrawFilter'
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
        <DrawFilter permission='selectiveprocess_create' anyCourse={true}>
          <Link className='btn btn-primary' title='Novo processo seletivo' to={`${this.props.match.url}/create`}>
            <i className='fas fa-plus-circle' /> Adicionar
          </Link>
        </DrawFilter>
      </React.Fragment>
    )
  }

  renderTable(processes) {
    return (
      <React.Fragment>
        <ul className='table-list'>
          <div className='titulos'>
            <span>Edital</span>
            <span>Nível</span>
            <span>Curso</span>
            <span>Atribuição</span>
            <span />
          </div>

          {processes.selectiveProcesses.map(process => {
            return (
              <li
                key={process.id}
                className={process.visible ? 'edital edital-item' : 'edital edital-item text-black-50'}>
                <h3>
                  <Link title='Acessar processo seletivo' to={`${this.props.match.url}/read/${process.id}`}>
                    {process.number}/{process.year}
                  </Link>
                </h3>
                <p className='tipo-de-curso'>
                  {process.Course.GraduationType ? process.Course.GraduationType.name : '-'}
                </p>
                <p className='curso'>{process.Course.name}</p>
                <p className='atribuicao'>
                  {process.Assignments.length > 0
                    ? process.Assignments.map((assignment, key) => {
                        if (key === 0) {
                          return assignment.name
                        } else {
                          return `, ${assignment.name}`
                        }
                      })
                    : 'Atribuições não definidas'}
                </p>
                <p tabIndex='-1' />
              </li>
            )
          })}
        </ul>

        {this.renderPagination(processes)}
      </React.Fragment>
    )
  }

  renderProcesses(processes) {
    return (
      <div className=''>
        {processes.selectiveProcesses.length > 0 ? (
          this.renderTable(processes)
        ) : (
          <p className='m-0'>Sem resultados para exibir.</p>
        )}
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
    const processTable = processes === null || loading ? <Spinner /> : this.renderProcesses(processes)

    return (
      <div className='user-list'>
        <div className='container'>
          <div className='breadcrumb' />

          <div id='main'>
            <h1>Processos seletivos</h1>
            <div className='btn-right'>{this.renderAdd()}</div>

            <ProcessFilters
              filters={this.props.filters}
              onCheckItem={this.markFilterV2}
              onSubmit={this.props.addFilter}
              onRemoveFilter={this.removeFilter}
              onClearFilters={this.clearFiltersV2}
            />

            {processTable}
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
