import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { clearErrors } from '../../actions/errorActions'
import { getCourses, createCourse, updateCourse, deleteCourse } from './courseActions'
import { compareBy } from 'utils/compareBy'
import CourseModalForm from './CourseModalForm'
import CourseModalDelete from './CourseModalDelete'
import { getGraduationTypes } from 'components/graduationType/graduationTypeActions'

class CourseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortMethod: '',
      sortReverse: false,
      coursesList: [],
      errors: []
    }

    this.sortBy = this.sortBy.bind(this)
    this.orderIcon = this.orderIcon.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors()
    this.props.getCourses()
    this.props.getGraduationTypes()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.courseStore.courses) {
      this.setState(
        {
          sortMethod: '',
          sortReverse: false,
          coursesList: nextProps.courseStore.courses
        },
        () => this.sortBy('name', { reverse: false })
      )
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors
    let valResult = { error: '', isValid: true }
    switch (e.target.name) {
      case 'new_item':
        break
      default:
        break
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error }
    } else {
      delete errors[e.target.name]
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    })
  }

  sortBy(key = 'name', options) {
    let sortMethod = this.state.sortMethod
    let sortReverse = this.state.sortReverse
    let arrayCopy = [...this.state.coursesList]

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true
      }
    }

    arrayCopy.sort(compareBy(key))

    if (sortReverse) {
      arrayCopy.reverse()
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      coursesList: arrayCopy
    })
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className="fas fa-arrow-up" />
      } else {
        return <i className="fas fa-arrow-down" />
      }
    }
    return null
  }

  render() {
    const { coursesList } = this.state
    const { graduationTypes } = this.props.graduationTypeStore
    console.log(graduationTypes)

    //Add item - form
    const addItemTool = (
      <div>
        <div className="btn-right">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">
            <i className="fas fa-plus-circle" /> Adicionar
          </button>
        </div>

        <CourseModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createCourse}
          reloadFunction={this.props.getCourses}
          graduationTypes={graduationTypes}
        />
      </div>
    )

    //item list
    const coursesTable = (
      <div>
        {coursesList ? (
          <ul className="table-list">
            <div className="titulos">
              <span onClick={() => this.sortBy('name')}>Nome {this.orderIcon('name')}</span>
              {/* <span onClick={() => this.sortBy('level')}>Nível {this.orderIcon('level')}</span> */}
              <span>Nível</span>
              {/* <span onClick={() => this.sortBy('description')}>Descrição {this.orderIcon('description')}</span> */}
              <span>Descrição</span>
              <span></span>
            </div>

              {coursesList.length > 0 ? (
                coursesList.map(course => {
                  return (
                    <li key={course.id}>
                      <h3>{course.name}</h3>
                      <p>{course.GraduationType.name}</p>
                      <p>
                        {course.description ? course.description : <span className="text-muted">Sem descrição.</span>}
                      </p>
                      <p className="text-right">
                        <button
                          type="button"
                          className="btn btn-icon"
                          data-toggle="modal"
                          data-target={`#editModal-${course.id}`}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon"
                          data-toggle="modal"
                          data-target={`#deleteModal-${course.id}`}>
                          <i className="fas fa-trash" />
                        </button>
                      </p>
                      <CourseModalForm
                        targetName={`editModal-${course.id}`}
                        mode="edit"
                        item={course}
                        editFunction={this.props.updateCourse}
                        reloadFunction={this.props.getCourses}
                        graduationTypes={graduationTypes}
                      />
                      <CourseModalDelete
                        targetName={`deleteModal-${course.id}`}
                        item={course}
                        deleteFunction={this.props.deleteCourse}
                        reloadFunction={this.props.getCourses}
                      />
                    </li>
                    
                  )
                })
              ) : (
                <li>
                  Sem itens para exibir
                </li>
              )}
          </ul>
        ) : (
          <p>
            Sem itens para exibir
          </p>
        )}
      </div>
    )

    return (
      <div className="assignments">
        <div className="container">
          <div className="breadcrumb">              
            <span>Você está em:</span>
            <Link to="/parameters" className="breadcrumb-link">
              Parâmetros
            </Link>
            <i className="fas fa-greater-than"></i>
            <span>Cursos</span>
          </div>

          <div id="main">
            <h1>Cursos</h1>
            {addItemTool}
            {/* <p className="lead text-muted">Cursos que fazem uso do sistema de processo seletivo</p> */}
            {coursesTable}
          </div>
        </div>
      </div>
    )
  }
}

CourseList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  graduationTypeStore: state.graduationTypeStore,
  courseStore: state.courseStore
})

export default connect(mapStateToProps, {
  clearErrors,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getGraduationTypes
})(CourseList)
