// prettier-ignore

import React, { useState, useEffect, Fragment } from 'react'
import ItemCreate from './GraduationTypeCreate'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import ItemTable from './GraduationTypeTable'
import AlertError from 'components/common/AlertError'

import { listGraduationType, createGraduationType } from './graduationTypeActions_V2'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GraduationTypeMain = props => {
  // Data
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' }
  ]

  const initialFormState = { id: null, name: '', username: '' }

  // Setting state
  const [users, setUsers] = useState(usersData)
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  //first load
  useEffect(() => {
    props.listGraduationType()
  }, [])

  // CRUD operations

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)

    setUsers(users.filter(user => user.id !== id))
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  //Item create state and handlers
  const [showItemCreate, setShowItemCreate] = useState(false)
  const openItemCreate = () => {
    setShowItemCreate(true)
  }
  const hideItemCreate = () => {
    setShowItemCreate(false)
  }

  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const renderAlertError = () => {
    if (props.errorStore.source !== 'createGraduationType' || props.errorStore.source !== 'createGraduationType') {
      return <AlertError errors={props.errorStore} />
    }
  }

  return (
    <div className="container">
      <h1>Níveis de graduação</h1>
      {renderAlertError()}
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>{/* <AddUserForm show={addItem} addUser={addUser} /> */}</Fragment>
          )}
        </div>
        <div className="flex-large">
          {/* <UserTable openAddItem={openAddItem} users={users} editRow={editRow} deleteUser={deleteUser} /> */}
          <ItemTable
            openItemCreate={openItemCreate}
            users={users}
            loadingItens={props.graduationTypeStore_v2.loading}
            itens={props.graduationTypeStore_v2.graduationTypes}
            editRow={editRow}
            deleteUser={deleteUser}
          />
          <ItemCreate show={showItemCreate} createItem={props.createGraduationType} hideItemCreate={hideItemCreate} />
          {/* <ItemEdit/> */}
        </div>
      </div>
    </div>
  )
}

GraduationTypeMain.proptypes = {
  listGraduationType: PropTypes.func.isRequired,
  createGraduationType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  graduationTypeStore_v2: state.graduationTypeStore_V2,
  errorStore: state.errorStore
})

const mapFunctionsToProps = {
  listGraduationType,
  createGraduationType
}

export default connect(mapStateToProps, mapFunctionsToProps)(GraduationTypeMain)
