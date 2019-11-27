import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import TextFieldGroup from 'components/common/TextFieldGroup'

const GraduationTypeCreate = props => {
  //Set state
  const initialFormState = { id: null, name: '', username: '' }
  const [user, setUser] = useState(initialFormState)
  const [Item, setItem] = useState(initialFormState)
  const errors = {}

  //onChange itens
  const onChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  //Submit function
  const onSubmit = event => {
    event.preventDefault()
    if (!user.name || !user.username) return
    props.addItem(user)
    props.hideItemCreate()
    setUser(initialFormState)
  }

  //Renderizar formuario
  const renderForm = props => {
    return (
      <form onSubmit={onSubmit}>
        <TextFieldGroup
          type="text"
          name="name"
          label="Nome: *"
          value={Item.name}
          onChange={onChange}
          error={errors.name}
        />
      </form>
    )
  }

  //return
  return (
    <Modal show={props.show} onHide={props.hideItemCreate} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Criar Nível de graduação</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm(props)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideItemCreate}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Criar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GraduationTypeCreate
