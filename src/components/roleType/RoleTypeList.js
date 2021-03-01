/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRoleTypes } from './roleTypeActions'
import { compareBy } from 'utils/compareBy'
import Spinner from 'components/common/Spinner'

class RoleTypesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      roleTypesList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.getRoleTypes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.roleTypeStore.roleTypes) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          roleTypesList: nextProps.roleTypeStore.roleTypes
        },
        () => this.sortBy('name', { reverse: false })
      )
    }
  }

  sortBy(key = 'name', options) {
    let sortMethod = this.state.sortMethod
    let sortReverse = this.state.sortReverse
    let arrayCopy = [...this.state.roleTypesList]

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true
      }
    }

    const compareByScope = (a, b) => {
      const A = a.global ? 'g' : 'c'
      const B = b.global ? 'g' : 'c'

      if (A.toLowerCase() < B.toLowerCase()) return -1
      if (A.toLowerCase() > B.toLowerCase()) return 1
      return 0
    }

    switch (key) {
      case 'scope':
        arrayCopy.sort(compareByScope)
        break
      default:
        arrayCopy.sort(compareBy(key))
    }

    if (sortReverse) {
      arrayCopy.reverse()
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      roleTypesList: arrayCopy
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
    const { roleTypeStore } = this.props
    const { roleTypesList } = this.state

    const roleTypesTable =
      roleTypeStore.roleTypes === null || roleTypeStore.loading ? (
        <Spinner />
      ) : roleTypesList.length > 0 ? (
        <div>
          <ul className='table-list'>
            <div className='titulos'>
              <span onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</span>
              {/* <th onClick={() => this.sortBy('description')}>Descrição {this.orderIcon('description')}</th> */}
              {/* <th onClick={() => this.sortBy('scope')}>Escopo {this.orderIcon('scope')}</th> */}
              <span>Escopo</span>
              <span>Descrição</span>
              <span />
            </div>
            {roleTypesList.map(roleType => {
              return (
                <li key={roleType.id}>
                  <h3>{roleType.name}</h3>
                  <p>{roleType.global ? 'Global' : 'Curso'}</p>
                  <p>{roleType.description}</p>
                  <p className='text-right'>
                    {/* <Link className="btn-icon laranja" title='Acessar tipo de papel' to={`/parameters/roletypes/${roleType.id}`}>
                        <i className="fas fa-eye" />
                      </Link>{' '} */}
                    <Link
                      className='btn-icon'
                      title='Atualizar tipo de papel'
                      to={`/parameters/roletypes/${roleType.id}/update`}>
                      <i className='fas fa-pencil-alt' />
                    </Link>{' '}
                    <Link
                      className='btn-icon'
                      title='Excluir tipo de papel'
                      to={`/parameters/roletypes/${roleType.id}/delete`}>
                      <i className='fas fa-trash' />
                    </Link>
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div>
          <p>
            Sem tipos de papel cadastrados.{' '}
            <Link className='text-success' title='Novo tipo de papel' to={`${this.props.match.url}/create`}>
              <i className='fas fa-plus-circle' />
              Adicionar
            </Link>
          </p>
        </div>
      )

    const addButton = (
      <div className='btn-right'>
        <Link title='Adicionar tipo de papel' to={`${this.props.match.url}/create`} className='btn btn-primary'>
          <i className='fas fa-plus-circle' /> Adicionar
        </Link>
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
            <span>Tipos de papel</span>
          </div>

          <div id='main'>
            <h1>Tipos de papel</h1>
            {addButton}
            {/* <p className="lead text-muted">Papéis que podem ser atribuidos a usuários dentro do sistema</p> */}
            {roleTypesTable}
          </div>
        </div>
      </div>
    )
  }
}

RoleTypesList.proptypes = {
  getRoleTypes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore
})

export default connect(
  mapStateToProps,
  {
    getRoleTypes
  }
)(RoleTypesList)
