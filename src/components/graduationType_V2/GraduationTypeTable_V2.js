import React from 'react'

const GraduationTypeTable = props => {
  const renderTable = props => {
    //Spinner
    if (props.loading) {
      return <p>Spinner</p>
    }

    //No itens
    if (props.itens.length === 0) {
      return <p>Sem resultados para exibir.</p>
    }

    //have itens
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>
              <div className="float-right">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.itens.length > 0 ? (
            props.itens.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <div className="float-right">
                    <button
                      onClick={() => {
                        props.editRow(user)
                      }}
                      className="btn btn-primary mr-1">
                      Editar
                    </button>
                    <button onClick={() => props.deleteUser(user.id)} className="btn btn-danger">
                      Apagar
                    </button>
                  </div>
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

  //Render do card
  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h4 className="pt-1">Resultados</h4>
          </div>
          <div className="col">
            <div className="float-right">
              <button className="btn btn-success" onClick={props.openItemCreate}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">{renderTable(props)}</div>
    </div>
  )
}

export default GraduationTypeTable
