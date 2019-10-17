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

  renderUserList(users, loading) {
    if (users === null || loading) {
      return <Spinner />
    }

    if (users.length === 0) {
      return (
        <div className="card mb-4">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h4 className="mb-0">Usuários</h4>
              </div>
              <div className="col">
                <div className="float-right">
                  <DrawFilter permission="user_create">
                    <Link className="text-success" to={`${this.props.match.url}/create`}>
                      <i className="fas fa-plus-circle" /> Adicionar
                    </Link>
                  </DrawFilter>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p>Sem resultados para exibir.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Usuários</h4>
            </div>
            <div className="col">
              <div className="float-right">
                <DrawFilter permission="user_create">
                  <Link className="text-success" to={`${this.props.match.url}/create`}>
                    <i className="fas fa-plus-circle" /> Adicionar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome/Sobrenome</th>
                <th>Login/Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={`${this.props.match.url}/${user.id}`}>
                        {user.Person ? `${user.Person.name} ${user.Person.surname}` : `Sem nome`}
                      </Link>
                    </td>

                    <td>{user.login}</td>

                    <td>{user.authorized ? 'Ativo' : 'Desativado'}</td>

                    <td>
                      <Link className="text-info" to={`${this.props.match.url}/${user.id}`}>
                        <i className="fas fa-search-plus" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={users.info.currentPage}
            numberOfPages={users.info.numberOfPages}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    )
  }

  render() {
    const { users, loading } = this.props.userStore
    //const { users, loading } = { users: [], loading: false };

    return (
      <div className="user-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Lista de usuários</h1>
              <p className="lead text-muted" />

              {this.renderUserList(users, loading)}

              {/* {usersContent} */}
            </div>
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

export default connect(
  mapStateToProps,
  { getUserList }
)(UserList)
