// prettier-ignore

import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ItemTable from './GraduationTypeTable'
import ItemCreate from './GraduationTypeCreate'
import ItemUpdate from './GraduationTypeUpdate'
import ItemDelete from './GraduationTypeDelete'
import AlertError from 'components/common/AlertError'

import {
  listGraduationType,
  createGraduationType,
  updateGraduationType,
  deleteGraduationType
} from './graduationTypeActions_V2'

const GraduationTypeMain = props => {
  const initialFormState = { id: null, name: '', username: '' }
  const [currentItem, setCurrentItem] = useState(initialFormState)

  //first load
  useEffect(() => {
    props.listGraduationType()
  }, [])

  //Item create state and handlers
  const [showItemCreate, setShowItemCreate] = useState(false)
  const openItemCreate = () => {
    setShowItemCreate(true)
  }
  const hideItemCreate = () => {
    setShowItemCreate(false)
  }

  //Item update state and handlers
  const [showItemUpdate, setShowItemUpdate] = useState(false)
  const openItemUpdate = item => {
    setCurrentItem(item)
    setShowItemUpdate(true)
  }
  const hideItemUpdate = () => {
    setCurrentItem(initialFormState)
    setShowItemUpdate(false)
  }

  //Item delete state and handlers
  const [showItemDelete, setShowItemDelete] = useState(false)
  const openItemDelete = item => {
    setCurrentItem(item)
    setShowItemDelete(true)
  }
  const hideItemDelete = () => {
    setCurrentItem(initialFormState)
    setShowItemDelete(false)
  }

  const renderAlertError = () => {
    if (
      props.errorStore.source !== 'createGraduationType' &&
      props.errorStore.source !== 'updateGraduationType' &&
      props.errorStore.source !== 'deleteGraduationType'
    ) {
      return <AlertError errors={props.errorStore} />
    }
  }

  return (
    <div className="container">
      <h1>Níveis de graduação</h1>
      {renderAlertError()}
      <div className="flex-row">
        <div className="flex-large">
          <ItemTable
            openItemCreate={openItemCreate}
            loadingItens={props.graduationTypeStore_v2.loading}
            itens={props.graduationTypeStore_v2.graduationTypes}
            openItemUpdate={openItemUpdate}
            openItemDelete={openItemDelete}
          />
          <ItemCreate show={showItemCreate} createItem={props.createGraduationType} hideItemCreate={hideItemCreate} />
          <ItemUpdate
            show={showItemUpdate}
            updateItem={props.updateGraduationType}
            hideItemUpdate={hideItemUpdate}
            item={currentItem}
          />
          <ItemDelete
            show={showItemDelete}
            deleteItem={props.deleteGraduationType}
            hideItemDelete={hideItemDelete}
            item={currentItem}
          />
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
  createGraduationType,
  updateGraduationType,
  deleteGraduationType
}

export default connect(mapStateToProps, mapFunctionsToProps)(GraduationTypeMain)
