/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createStepType, getStepTypes, updateStepType, deleteStepType } from './stepTypeActions'
import { clearErrors } from 'actions/errorActions'
import { compareBy } from 'utils/compareBy'
import StepTypeModalForm from './StepTypeModalForm'
import StepTypeModalDelete from './StepTypeModalDelete'

class StepTypesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      stepTypeList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getStepTypes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.stepTypeStore.stepTypes) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          stepTypeList: nextProps.stepTypeStore.stepTypes
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
    let arrayCopy = [...this.state.stepTypeList]

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
      stepTypeList: arrayCopy
    })
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className='fas fa-arrow-up' />
      } else {
        return <i className='fas fa-arrow-down' />
      }
    }
    return null
  }

  render() {
    const { stepTypeList } = this.state

    //Add item - form
    const addItemTool = (
      <div>
        <div className='btn-right'>
          <button
            type='button'
            title='Adicionar tipo de etapa'
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#addModal'>
            <i className='fas fa-plus-circle' /> Adicionar
          </button>
        </div>

        <StepTypeModalForm
          mode='add'
          targetName='addModal'
          addFunction={this.props.createStepType}
          reloadFunction={this.props.getStepTypes}
        />
      </div>
    )

    //item list
    const stepTypesTable = (
      <div>
        {stepTypeList ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</span>
              <span>Descrição</span>
              <span />
            </div>
            {stepTypeList.length > 0 ? (
              stepTypeList.map(stepType => {
                return (
                  <li key={stepType.id}>
                    <h3>{stepType.name}</h3>
                    <p>{stepType.description ? stepType.description : ''}</p>
                    <p className='text-right'>
                      <button
                        type='button'
                        title='Atualizar tipo de etapa'
                        className='btn btn-icon'
                        data-toggle='modal'
                        data-target={`#editModal-${stepType.id}`}>
                        <i className='fas fa-pencil-alt' />
                      </button>
                      <button
                        type='button'
                        title='Excluir tipo de etapa'
                        className='btn btn-icon'
                        data-toggle='modal'
                        data-target={`#deleteModal-${stepType.id}`}>
                        <i className='fas fa-trash' />
                      </button>
                    </p>
                    <StepTypeModalForm
                      targetName={`editModal-${stepType.id}`}
                      mode='edit'
                      item={stepType}
                      editFunction={this.props.updateStepType}
                      reloadFunction={this.props.getStepTypes}
                    />{' '}
                    <StepTypeModalDelete
                      targetName={`deleteModal-${stepType.id}`}
                      item={stepType}
                      deleteFunction={this.props.deleteStepType}
                      reloadFunction={this.props.getStepTypes}
                    />
                  </li>
                )
              })
            ) : (
              <li>Sem itens para exibir</li>
            )}
          </ul>
        ) : (
          <p colSpan='3'>Sem itens para exibir</p>
        )}
      </div>
    )

    return (
      <div className='stepTypes'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/parameters' className='breadcrumb-link'>
              Parâmetros
            </Link>
            <i className='fas fa-greater-than' />
            <span>Cursos</span>
          </div>

          <div id='main'>
            <h1>Tipos de etapa</h1>
            {addItemTool}
            {/* <p className="lead text-muted">Tipos de etapa disponíveis dentro do sistema</p> */}
            {stepTypesTable}
          </div>
        </div>
      </div>
    )
  }
}

StepTypesList.proptypes = {
  getStepTypes: PropTypes.func.isRequired,
  createStepType: PropTypes.func.isRequired,
  updateStepType: PropTypes.func.isRequired,
  deleteStepType: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  stepTypeStore: state.stepTypeStore
})

export default connect(
  mapStateToProps,
  {
    getStepTypes,
    createStepType,
    updateStepType,
    deleteStepType,
    clearErrors
  }
)(StepTypesList)
