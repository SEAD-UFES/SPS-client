import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearErrors } from "../../actions/errorActions";
import { getCourses, createCourse, updateCourse, deleteCourse } from "./courseActions";
import { compareBy } from "utils/compareBy";
import CourseModalForm from "./CourseModalForm";
import CourseModalDelete from "./CourseModalDelete";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      coursesList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.courseStore.courses) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          coursesList: nextProps.courseStore.courses
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
  }

  onChange(e) {
    //validação local dos campos
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };
    switch (e.target.name) {
      case "new_item":
        break;
      default:
        break;
    }
    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //Atualizando os estados do campos e dos erros
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors
    });
  }

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.coursesList];

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse;
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true;
      }
    }

    arrayCopy.sort(compareBy(key));

    if (sortReverse) {
      arrayCopy.reverse();
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      coursesList: arrayCopy
    });
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className="fas fa-arrow-up" />;
      } else {
        return <i className="fas fa-arrow-down" />;
      }
    }
    return null;
  }

  render() {
    const { coursesList } = this.state;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addModal">
            + Adicionar curso
          </button>
        </div>

        <CourseModalForm mode="add" targetName="addModal" addFunction={this.props.createCourse} reloadFunction={this.props.getCourses} />
      </div>
    );

    //item list
    const coursesTable = (
      <div>
        <h4 className="mb-2">Lista de cursos</h4>
        {coursesList ? (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>Nome {this.orderIcon("name")}</th>
                <th onClick={() => this.sortBy("description")}>Descrição {this.orderIcon("description")}</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {coursesList.length > 0 ? (
                coursesList.map(course => {
                  return (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>{course.description ? course.description : <span className="text-muted">Sem descrição.</span>}</td>
                      <td>
                        <button type="button" className="btn btn-link buttonAsLink text-info" data-toggle="modal" data-target={`#editModal-${course.id}`}>
                          <i className="far fa-edit" />
                        </button>
                        <CourseModalForm
                          targetName={`editModal-${course.id}`}
                          mode="edit"
                          item={course}
                          editFunction={this.props.updateCourse}
                          reloadFunction={this.props.getCourses}
                        />{" "}
                        <button type="button" className="btn btn-link buttonAsLink" data-toggle="modal" data-target={`#deleteModal-${course.id}`}>
                          <i className="far fa-trash-alt text-danger" />
                        </button>
                        <CourseModalDelete
                          targetName={`deleteModal-${course.id}`}
                          item={course}
                          deleteFunction={this.props.deleteCourse}
                          reloadFunction={this.props.getCourses}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">Sem itens para exibir</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3">Sem itens para exibir</td>
          </tr>
        )}
      </div>
    );

    return (
      <div className="assignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Cursos</h1>
              <p className="lead text-muted">Cursos que fazem uso do sistema de processo seletivo</p>
              {addItemTool}
              {coursesTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courseStore: state.courseStore
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
  }
)(CourseList);
