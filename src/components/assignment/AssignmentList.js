/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { clearErrors } from '../../actions/errorActions'
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from './assignmentActions'
import { createAssignmentV2 } from '../../store/actions/assignment'
import { compareBy } from 'utils/compareBy'
import AssignmentModalForm from './AssignmentModalForm'
import AssignmentModalDelete from './AssignmentModalDelete'

class AssignmentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      assignmentList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getAssignments()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.assignmentStore.assignments) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          assignmentList: nextProps.assignmentStore.assignments
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
    let arrayCopy = [...this.state.assignmentList]

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
      assignmentList: arrayCopy
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
    const { assignmentList } = this.state

    //Add item - form
    const addItemTool = (
      <div>
        <div className='btn-right'>
          <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#addModal'>
            <i className='fas fa-plus-circle' /> Adicionar
          </button>
        </div>

        <AssignmentModalForm
          mode='add'
          targetName='addModal'
          addFunction={this.props.createAssignmentV2}
          reloadFunction={this.props.getAssignments}
        />
      </div>
    )

    //item list
    const assignmentsTable = (
      <div>
        {assignmentList ? (
          <ul className='table-list'>
            <div className='titulos'>
              <span onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</span>
              {/* <th onClick={() => this.sortBy('description')}>Descrição {this.orderIcon('description')}</th> */}
              <span>Descrição</span>
              <span />
            </div>
            {assignmentList.length > 0 ? (
              assignmentList.map(assignment => {
                return (
                  <li key={assignment.id}>
                    <h3>{assignment.name}</h3>
                    <p>
                      {assignment.description ? (
                        assignment.description
                      ) : (
                        <span className='text-muted'>Sem descrição.</span>
                      )}
                    </p>
                    <p className='text-right'>
                      <button
                        type='button'
                        className='btn btn-icon'
                        data-toggle='modal'
                        data-target={`#editModal-${assignment.id}`}>
                        <i className='fas fa-pencil-alt' />
                      </button>
                      <button
                        type='button'
                        className='btn btn-icon'
                        data-toggle='modal'
                        data-target={`#deleteModal-${assignment.id}`}>
                        <i className='fas fa-trash' />
                      </button>
                    </p>
                    <AssignmentModalForm
                      targetName={`editModal-${assignment.id}`}
                      mode='edit'
                      item={assignment}
                      editFunction={this.props.updateAssignment}
                      reloadFunction={this.props.getAssignments}
                    />{' '}
                    <AssignmentModalDelete
                      targetName={`deleteModal-${assignment.id}`}
                      item={assignment}
                      deleteFunction={this.props.deleteAssignment}
                      reloadFunction={this.props.getAssignments}
                    />
                  </li>
                )
              })
            ) : (
              <li>Sem itens para exibir</li>
            )}
          </ul>
        ) : (
          <p>Sem itens para exibir</p>
        )}
      </div>
    )

    return (
      <div className='assignments'>
        <div className='container'>
          <div className='breadcrumb'>
            <span>Você está em:</span>
            <Link to='/parameters' className='breadcrumb-link'>
              Parâmetros
            </Link>
            <i className='fas fa-greater-than' />
            <span>Atribuições</span>
          </div>

          <div id='main'>
            <h1>Atribuições</h1>
            {addItemTool}
            {/* <p className="lead text-muted">Atribuições que serão ofertadas pelo sistema</p> */}
            {assignmentsTable}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getAssignments: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
  updateAssignment: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  assignmentStore: state.assignmentStore
})

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getAssignments,
    createAssignment,
    createAssignmentV2,
    updateAssignment,
    deleteAssignment
  }
)(AssignmentList)
