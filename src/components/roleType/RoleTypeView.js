import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRoleType } from './roleTypeActions'
import Spinner from 'components/common/Spinner'
import { comparePermissionByName } from 'utils/compareBy'

class RoleTypeView extends Component {
  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id)
    }
  }

  buildPermissionAssignment(roleType, permission) {
    let dryRoleType = JSON.parse(JSON.stringify(roleType))
    delete dryRoleType.Permissions

    let dryPermission = JSON.parse(JSON.stringify(permission))
    delete dryPermission.RolePermission

    let permAssig = {}
    permAssig = permission.RolePermission
    permAssig.RoleType = dryRoleType
    permAssig.Permission = dryPermission

    return permAssig
  }

  render() {
    const { roleTypeStore } = this.props

    const infoTable =
      roleTypeStore.roleType === null || roleTypeStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{roleTypeStore.roleType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{roleTypeStore.roleType.description}</td>
              </tr>
              <tr>
                <td>
                  <strong>Escopo:</strong>
                </td>
                <td>{roleTypeStore.roleType.global ? 'Global' : 'Curso'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    const permissionsTable =
      roleTypeStore.roleType === null || roleTypeStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Lista de permissões atribuidas</h4>
          {roleTypeStore.roleType.name === 'Administrador' ? (
            <p>Administradores podem tudo.</p>
          ) : roleTypeStore.roleType.Permissions.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>
                    <Link
                      className="text-success"
                      to={{
                        pathname: `${this.props.match.url}/create-permassig`,
                        state: { roleType: roleTypeStore.roleType }
                      }}>
                      <i className="fas fa-plus-circle" />
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleTypeStore.roleType.Permissions.sort(comparePermissionByName).map(permission => {
                  return (
                    <tr key={permission.id}>
                      <td>{permission.name}</td>
                      <td>
                        <Link
                          className="text-danger"
                          to={{
                            pathname: `/parameters/roletypes/${roleTypeStore.roleType.id}/delete-permassig/${permission.RolePermission.id}`,
                            state: {
                              roleType: roleTypeStore.roleType,
                              rolePermission: this.buildPermissionAssignment(roleTypeStore.roleType, permission)
                            }
                          }}>
                          <i className="fas fa-times-circle" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <p>
                Não existem permissões associadas a esse papel.{' '}
                <Link
                  className="text-success"
                  to={{
                    pathname: `${this.props.match.url}/create-permassig`,
                    state: { roleType: roleTypeStore.roleType }
                  }}>
                  <i className="fas fa-plus-circle" /> Adicionar
                </Link>
              </p>
            </div>
          )}
        </div>
      )

    return (
      <div className="roletypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/parameters/roletypes" className="btn btn-light">
                Voltar para lista de tipos de papel
              </Link>
              <h1 className="display-4 mb-4">Tipo de Papel</h1>
              {infoTable}
              {permissionsTable}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RoleTypeView.propTypes = {
  getRoleType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  roleTypeStore: state.roleTypeStore
})

export default connect(
  mapStateToProps,
  {
    getRoleType
  }
)(RoleTypeView)
