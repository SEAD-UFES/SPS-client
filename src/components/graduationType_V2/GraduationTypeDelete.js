import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import TextFieldGroup from 'components/common/TextFieldGroup'
import AlertError from '../common/AlertError'
import { connect } from 'react-redux'
import { clearErrors } from 'actions/errorActions'

const GraduationTypeDelete = props => {
  //Set state
  const initialFormState = props.item ? props.item : { id: null, name: '' }
  const [item, setItem] = useState(initialFormState)
  const errors = {}

  useEffect(() => {
    setItem(props.item)
  }, [props.item])

  const hideItemDelete = () => {
    props.hideItemDelete()
    props.clearErrors()
    setItem(initialFormState)
  }

  //onChange itens
  const onChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setItem({ ...item, [name]: value })
  }

  //Submit function
  const onSubmit = event => {
    event.preventDefault()
    props.deleteItem(item.id, It => {
      props.hideItemDelete()
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
          value={item.name}
          onChange={onChange}
          error={errors.name}
          disabled
        />
      </form>
    )
  }

  //return
  return (
    <Modal show={props.show} onHide={hideItemDelete} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Apagar Nível de graduação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertError errors={props.errorStore} />
        {renderForm(props)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideItemDelete}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

export default connect(mapStateToProps, { clearErrors })(GraduationTypeDelete)
