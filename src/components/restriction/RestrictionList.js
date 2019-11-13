import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { clearErrors } from 'actions/errorActions'
import { getRestrictions, createRestriction, updateRestriction, deleteRestriction } from './restrictionActions'
import { compareBy } from 'utils/compareBy'
import RestrictionModalForm from './RestrictionModalForm'
import RestrictionModalDelete from './RestrictionModalDelete'

class RestrictionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      restrictionsList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getRestrictions()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.restrictionStore.restrictions) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          restrictionsList: nextProps.restrictionStore.restrictions
        },
        () => this.sortBy('name', { reverse: false })
      )
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'new_item':
        break
      default:
        break
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error }
    } else {
      delete errors[e.target.name]
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    })
  }

  sortBy(key = 'name', options) {
    let sortMethod = this.state.sortMethod
    let sortReverse = this.state.sortReverse
    let arrayCopy = [...this.state.restrictionsList]

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
      restrictionsList: arrayCopy
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
    const { restrictionsList } = this.state

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">
            + Adicionar restrição
          </button>
        </div>

        <RestrictionModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createRestriction}
          reloadFunction={this.props.getRestrictions}
        />
      </div>
    )

    //item list
    const restrictionsTable = (
      <div>
        <h4 className="mb-2">Lista de restrições</h4>
        {RestrictionList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</th>
                <th onClick={() => this.sortBy('description')}>Descrição {this.orderIcon('description')}</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {restrictionsList.length > 0 ? (
                restrictionsList.map(restriction => {
                  return (
                    <tr key={restriction.id}>
                      <td>{restriction.name}</td>
                      <td>
                        {restriction.description ? (
                          restriction.description
                        ) : (
                          <span className="text-muted">Sem descrição.</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-primary"
                          data-toggle="modal"
                          data-target={`#editModal-${restriction.id}`}>
                          <i className="fas fa-cog" />
                        </button>
                        <RestrictionModalForm
                          targetName={`editModal-${restriction.id}`}
                          mode="edit"
                          item={restriction}
                          editFunction={this.props.updateRestriction}
                          reloadFunction={this.props.getRestrictions}
                        />{' '}
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-danger"
                          data-toggle="modal"
                          data-target={`#deleteModal-${restriction.id}`}>
                          <i className="fas fa-times-circle" />
                        </button>
                        <RestrictionModalDelete
                          targetName={`deleteModal-${restriction.id}`}
                          item={restriction}
                          deleteFunction={this.props.deleteRestriction}
                          reloadFunction={this.props.getRestrictions}
                        />
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="3">Sem itens para exibir</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3">Sem itens para exibir</td>
          </tr>
        )}
      </div>
    )

    return (
      <div className="restrictions">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Restrições</h1>
              <p className="lead text-muted">Restrições que serão ofertadas pelo sistema</p>
              {addItemTool}
              {restrictionsTable}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RestrictionList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getRestrictions: PropTypes.func.isRequired,
  createRestriction: PropTypes.func.isRequired,
  updateRestriction: PropTypes.func.isRequired,
  deleteRestriction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  restrictionStore: state.restrictionStore
})

export default connect(mapStateToProps, {
  clearErrors,
  getRestrictions,
  createRestriction,
  updateRestriction,
  deleteRestriction
})(RestrictionList)
