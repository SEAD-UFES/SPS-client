import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import TextFieldGroup from 'components/common/TextFieldGroup'
import AlertError from '../common/AlertError'
import { connect } from 'react-redux'
import { clearErrors } from 'actions/errorActions'
import { validateName } from '../../validation'

const GraduationTypeUpdate = props => {
  //Set state
  const initialFormState = props.item ? props.item : { id: null, name: '', username: '' }
  const [item, setItem] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setItem(props.item)
  }, [props.item])

  const hideItemUpdate = () => {
    props.hideItemUpdate()
    props.clearErrors()
    setItem(initialFormState)
    setErrors({})
  }

  //onChange itens
  const onChange = event => {
    const { name, value } = event.target
    let valResult = { error: '', isValid: true }
    let TemporaryErrors = errors

    switch (name) {
      case 'name':
        valResult = validateName(value)
        break
      default:
        break
    }

    if (!valResult.isValid) {
      TemporaryErrors = { ...TemporaryErrors, [name]: valResult.error }
    } else {
      delete TemporaryErrors[name]
    }

    setItem({ ...item, [name]: value })
    setErrors(TemporaryErrors)
  }

  //Submit function
  const onSubmit = event => {
    event.preventDefault()
    props.updateItem(item, It => {
      props.hideItemUpdate()
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
        />
      </form>
    )
  }

  //return
  return (
    <Modal show={props.show} onHide={hideItemUpdate} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Nível de graduação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertError errors={props.errorStore} />
        {renderForm(props)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideItemUpdate}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  errorStore: state.errorStore
})

export default connect(mapStateToProps, { clearErrors })(GraduationTypeUpdate)
