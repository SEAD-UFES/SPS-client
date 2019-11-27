import React from 'react'

const GraduationTypeTable = props => {
  const renderTable = props => {
    if (props.users.length === 0) {
      return <p>Sem resultados para exibir.</p>
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    onClick={() => {
                      props.editRow(user)
                    }}
                    className="btn btn-primary mr-1">
                    Edit
                  </button>
                  <button onClick={() => props.deleteUser(user.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h4 className="mb-0">Resultados</h4>
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={props.openAddItem}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">{renderTable(props)}</div>
    </div>
  )
}

export default GraduationTypeTable
