import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import TextFieldGroup from 'components/common/TextFieldGroup'
import AlertError from '../common/AlertError'
import { connect } from 'react-redux'
import { clearErrors } from 'actions/errorActions'

const GraduationTypeCreate = props => {
  //Set state
  const initialFormState = props.initialFormState ? props.initialFormState : { id: null, name: '', username: '' }
  const [user, setUser] = useState(initialFormState)
  const [Item, setItem] = useState(initialFormState)
  const errors = {}

  const hideItemCreate = () => {
    props.hideItemCreate()
    props.clearErrors()
    setItem(initialFormState)
  }

  //onChange itens
  const onChange = event => {
    const { name, value } = event.target
    setItem({ ...user, [name]: value })
  }

  //Submit function
  const onSubmit = event => {
    event.preventDefault()
    delete Item.id
    props.createItem(Item, It => {
      setItem(initialFormState)
      props.hideItemCreate()
    })
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
    <Modal show={props.show} onHide={hideItemCreate} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Criar Nível de graduação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertError errors={props.errorStore} />
        {renderForm(props)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideItemCreate}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Criar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

export default connect(mapStateToProps, { clearErrors })(GraduationTypeCreate)
