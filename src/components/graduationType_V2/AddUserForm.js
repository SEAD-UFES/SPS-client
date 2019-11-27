import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddUserForm = props => {
  const initialFormState = { id: null, name: '', username: '' }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  //para react-bootstrap
  const showAddForm = () => {}
  const closeAddForm = () => {}

  //para modal caseiro
  const [show2, setShow2] = useState(false)
  const showModal = () => {
    console.log('display')
    setShow2(true)
    console.log(show2)
  }
  const hideModal = () => {
    setShow2(false)
  }

  //Renderizar formuario
  const renderForm = props => {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          if (!user.name || !user.username) return

          props.addUser(user)
          setUser(initialFormState)
        }}>
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        <button>Add new user</button>
      </form>
    )
  }

  const renderModal = () => {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  return (
    <Fragment>
      {console.log('render', show2)}
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Adicionar nível de graduação</h4>
        </div>
        <div className="card-body">{renderForm(props)}</div>
      </div>

      {renderModal()}

      <h1>React Modal</h1>
      <Modal2 show={show2} handleClose={hideModal}>
        <p>Modal</p>
        <p>Data</p>
      </Modal2>
      <button type="button" onClick={showModal}>
        open
      </button>
    </Fragment>
  )
}

const Modal2 = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  console.log(showHideClassName)

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p> coisas</p>
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  )
}

export default AddUserForm
