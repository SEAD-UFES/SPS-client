import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser)

  useEffect(() => {
    setUser(props.currentUser)
  }, [props])

  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const renderForm = props => {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()

          props.updateUser(user.id, user)
        }}>
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        <button>Update user</button>
        <button onClick={() => props.setEditing(false)} className="button muted-button">
          Cancel
        </button>
      </form>
    )
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4 className="mb-0">Editar nível de graduação</h4>
      </div>
      <div className="card-body">{renderForm(props)}</div>
    </div>
  )
}

export default EditUserForm
