import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getUserList } from './userActions'
import Spinner from '../common/Spinner'
import Pagination from '../common/Pagination'

import DrawFilter from 'components/profile/DrawFilter'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageOfItems: []
    }

    this.onChangePage = this.onChangePage.bind(this)
  }

  componentDidMount() {
    this.props.getUserList()
  }

  //componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    //this.setState({ pageOfItems: pageOfItems });
    this.props.getUserList(page, pageSize)
  }

  renderUserAdd(users, loading){
    if (users === null || loading) {
      return <Spinner />
    }

    return (
      <div className="btn-right">
        <DrawFilter permission="user_create">
          <Link className="btn btn-primary" to={`${this.props.match.url}/create`}>
            <i className="fas fa-plus-circle" /> Adicionar
          </Link>
        </DrawFilter>
      </div>
    )
  }

  renderUserList(users, loading) {
    if (users === null || loading) {
      return <Spinner />
    }

    if (users.length === 0) {
      return (
        <div>
            <p>Sem resultados para exibir.</p>
        </div>
      )
    }

    return (
      <div>
        <ul className="table-list">
          <div class="titulos">
            <span>Nome</span>
            <span>Login/Email</span>
            <span>Status</span>
          </div>

          {users.users.map(user => {
            return (
              <li key={user.id}>
                <h3>
                  <Link to={`${this.props.match.url}/${user.id}`}>
                    {user.Person ? `${user.Person.name} ${user.Person.surname}` : `Sem nome`}
                  </Link>
                </h3>

                <p>{user.login}</p>

                <p>{user.authorized ? 'Ativo' : 'Desativado'}</p>
              </li>
            )
          })}
        </ul>

        <Pagination
          currentPage={users.info.currentPage}
          numberOfPages={users.info.numberOfPages}
          onChangePage={this.onChangePage}
        />
      </div>
    )
  }

  render() {
    const { users, loading } = this.props.userStore
    //const { users, loading } = { users: [], loading: false };

    return (
      <div className="user-list">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i class="fas fa-greater-than"></i>
            <span>Usuários</span>
          </div>

          <div id="main">
            <h1>Lista de usuários</h1>
            {this.renderUserAdd(users, loading)}

            <p className="lead text-muted" />

            {this.renderUserList(users, loading)}

            {/* {usersContent} */}
          </div>
        </div>
      </div>
    )
  }
}

UserList.propTypes = {
  getUserList: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userStore: state.userStore
})

export default connect(mapStateToProps, { getUserList })(UserList)
