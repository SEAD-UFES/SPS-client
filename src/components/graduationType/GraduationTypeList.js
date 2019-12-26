import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  createGraduationType,
  getGraduationTypes,
  updateGraduationType,
  deleteGraduationType
} from './graduationTypeActions'
import { clearErrors } from 'actions/errorActions'
import { compareBy } from 'utils/compareBy'
import GraduationTypeModalForm from './GraduationTypeModalForm'
import GraduationTypeModalDelete from './GraduationTypeModalDelete'

class GraduationTypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      graduationTypeList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getGraduationTypes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.graduationTypeStore.graduationTypes) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          graduationTypeList: nextProps.graduationTypeStore.graduationTypes
        },
        () => this.sortBy('name', { reverse: false })
      )
    }
  }

  sortBy(key = 'name', options) {
    let sortMethod = this.state.sortMethod
    let sortReverse = this.state.sortReverse
    let arrayCopy = [...this.state.graduationTypeList]

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true
      }
    }

    arrayCopy.sort(compareBy(key))

    if (sortReverse) {
      arrayCopy.reverse()
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      graduationTypeList: arrayCopy
    })
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className="fas fa-arrow-up" />
      } else {
        return <i className="fas fa-arrow-down" />
      }
    }
    return null
  }

  render() {
    const { graduationTypeList } = this.state

    //Add item - form
    const addItemTool = (
      <div>
        <div className="btn-right">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">
            <i className="fas fa-plus-circle" /> Adicionar
          </button>
        </div>

        <GraduationTypeModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createGraduationType}
          reloadFunction={this.props.getGraduationTypes}
        />
      </div>
    )

    //item list
    const graduationTypesTable = (
      <div>
        {graduationTypeList ? (
          <ul className="table-list">
              <div className="titulos">
                <span onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</span>
                {/* <th>Descrição</th> */}
                <span></span>
              </div>
              {graduationTypeList.length > 0 ? (
                graduationTypeList.map(graduationType => {
                  return (
                    <li key={graduationType.id}>
                      <h3>{graduationType.name}</h3>
                      {/* <td>{graduationType.description ? graduationType.description : ""}</td> */}
                      <p className="text-right">
                        <button
                          type="button"
                          className="btn btn-icon"
                          data-toggle="modal"
                          data-target={`#editModal-${graduationType.id}`}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon"
                          data-toggle="modal"
                          data-target={`#deleteModal-${graduationType.id}`}>
                          <i className="fas fa-trash" />
                        </button>
                      </p>
                      <GraduationTypeModalForm
                          targetName={`editModal-${graduationType.id}`}
                          mode="edit"
                          item={graduationType}
                          editFunction={this.props.updateGraduationType}
                          reloadFunction={this.props.getGraduationTypes}
                        />{' '}
                        <GraduationTypeModalDelete
                          targetName={`deleteModal-${graduationType.id}`}
                          item={graduationType}
                          deleteFunction={this.props.deleteGraduationType}
                          reloadFunction={this.props.getGraduationTypes}
                        />
                    </li>
                  )
                })
              ) : (
                <li>
                  Sem itens para exibir
                </li>
              )}
          </ul>
        ) : (
            <p colSpan="3">Sem itens para exibir</p>
        )}
      </div>
    )

    return (
      <div className="graduationTypes">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Níveis de formação</span>
          </div>

          <div id="main">
              <h1>Níveis de formação</h1>
              {/* <p className="lead text-muted">Níveis de formação disponíveis dentro do sistema</p> */}
              {addItemTool}
              {graduationTypesTable}
          </div>
        </div>
      </div>
    )
  }
}

GraduationTypeList.proptypes = {
  getGraduationTypes: PropTypes.func.isRequired,
  createGraduationType: PropTypes.func.isRequired,
  updateGraduationType: PropTypes.func.isRequired,
  deleteGraduationType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  graduationTypeStore: state.graduationTypeStore
})

export default connect(mapStateToProps, {
  getGraduationTypes,
  createGraduationType,
  updateGraduationType,
  deleteGraduationType,
  clearErrors
})(GraduationTypeList)
