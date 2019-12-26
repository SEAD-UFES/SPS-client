import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { isEmpty } from 'validation'
import { getUserRoles } from './userRoleActions'
import Spinner from 'components/common/Spinner'

class UserRoleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      userRoleList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.getUserRoles()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.userRoleStore.userRoles) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          userRoleList: nextProps.userRoleStore.userRoles
        },
        () => {
          this.sortBy('user', { reverse: false })
        }
      )
    }
  }

  sortBy(key = 'user', options) {
    let sortMethod = this.state.sortMethod
    let sortReverse = this.state.sortReverse
    let arrayCopy = [...this.state.userRoleList]

    //Determinar se é ordem é forçada.
    if (options && !isEmpty(options.reverse)) {
      sortReverse = options.reverse
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true
      }
    }

    const compareByUser = (a, b) => {
      if (a.User.login.toLowerCase() < b.User.login.toLowerCase()) return -1
      if (a.User.login.toLowerCase() > b.User.login.toLowerCase()) return 1
      return 0
    }

    const compareByRoleType = (a, b) => {
      if (a.RoleType.name.toLowerCase() < b.RoleType.name.toLowerCase()) return -1
      if (a.RoleType.name.toLowerCase() > b.RoleType.name.toLowerCase()) return 1
      return 0
    }

    const compareByCourse = (a, b) => {
      const A = a.RoleType.global ? 'Papel global' : !isEmpty(a.Course) ? a.Course.name : ''
      const B = b.RoleType.global ? 'Papel global' : !isEmpty(b.Course) ? b.Course.name : ''

      if (A.toLowerCase() < B.toLowerCase()) return -1
      if (A.toLowerCase() > B.toLowerCase()) return 1
      return 0
    }

    switch (key) {
      case 'user':
        arrayCopy.sort(compareByUser)
        break
      case 'role':
        arrayCopy.sort(compareByRoleType)
        break
      case 'course':
        arrayCopy.sort(compareByCourse)
        break
      default:
    }

    if (sortReverse) {
      arrayCopy.reverse()
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      userRoleList: arrayCopy
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
    const { userRoleStore } = this.props
    const { userRoleList } = this.state

    const userRolesTable =
      userRoleStore.userRoles === null || userRoleStore.loading ? (
        <Spinner />
      ) : userRoleList.length > 0 ? (
        <div>
          <ul className="table-list">
            <div className="titulos">
                <span onClick={() => this.sortBy('user')}>Usuário {this.orderIcon('user')}</span>
                <span onClick={() => this.sortBy('role')}>Atribuição {this.orderIcon('role')}</span>
                <span onClick={() => this.sortBy('course')}>Curso {this.orderIcon('course')}</span>
                <span></span>
            </div>
              {userRoleList.map(userRole => {
                return (
                  <li key={userRole.id}>
                    <h3>
                      <Link to={`/users/${userRole.User.id}`}>{userRole.User.login}</Link>
                    </h3>
                    <p>
                      <Link to={`/parameters/roletypes/${userRole.RoleType.id}`}>{userRole.RoleType.name}</Link>
                    </p>
                    <p>
                      {userRole.RoleType.global ? (
                        'Papel global'
                      ) : userRole.Course ? (
                        userRole.Course.name
                      ) : (
                        <span className="text-muted">n/a</span>
                      )}
                    </p>
                    <p className="text-right">
                      <Link className="btn-icon" to={`${this.props.match.url}/${userRole.id}/delete`}>
                        <i className="fas fa-trash" />
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
            Sem atribuições de papel cadastrados.{' '}
            <Link className="text-success" to={`${this.props.match.url}/create`}>
              <i className="fas fa-plus-circle" />
              Adicionar
            </Link>
          </p>
        </div>
      )

    const addButton = (
      <div className="btn-right" role="group">
        <Link to={`${this.props.match.url}/create`} className="btn btn-primary">
          <i className="fas fa-plus-circle" /> Adicionar
        </Link>
      </div>
    )

    return (
      <div className="userRole-list">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Atribuições de papel</span>
          </div>

            <div id="main">
              <h1>Atribuições de papel</h1>
              {addButton}
              {/* <p className="lead text-muted">Atribuições de papel a usuários do sistema</p> */}
              {userRolesTable}
            </div>
        </div>
      </div>
    )
  }
}

UserRoleList.proptypes = {
  getUserRoles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userRoleStore: state.userRoleStore
})

export default connect(mapStateToProps, {
  getUserRoles
})(UserRoleList)
