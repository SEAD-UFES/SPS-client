import React, { Component } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function PublicationViewModal(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.publication.description}</Modal.Body>
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

export default class Teste extends Component {
  renderModal(publication) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Criar notícia</h4>
        </div>
        <div className="card-body">
          <PublicationViewModal publication={publication} />
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="teste-modal">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Testes</h1>
              {this.renderModal({ description: 'XXX' })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
