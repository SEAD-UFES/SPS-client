import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { clearErrors } from "../../../actions/errorActions";
import { getCourses, createCourse, updateCourse } from "./coursesActions";

import CoursesModalForm from "./CoursesModalForm";

class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //comportamento do componente
      add_item: false,

      //dados do item
      item_list: [],

      //errors:
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.props.getCourses();
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

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { coursesStorage } = this.props;

    //Add item - form
    const addItemTool = (
      <div>
        <div className="mb-2">
          <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target="#addModal"
          >
            + Adicionar curso
          </button>
        </div>

        <CoursesModalForm
          mode="add"
          targetName="addModal"
          addFunction={this.props.createCourse}
          reloadFunction={this.props.getCourses}
        />
      </div>
    );

    //item list
    const assignmentsList = (
      <div>
        <h4 className="mb-2">Lista de cursos</h4>
        {coursesStorage.courses ? (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              {coursesStorage.courses.length > 0 ? (
                coursesStorage.courses.map(course => {
                  return (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>
                        {course.description ? (
                          course.description
                        ) : (
                          <span className="text-muted">Sem descrição.</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink text-info"
                          data-toggle="modal"
                          data-target={`#editModal-${course.id}`}
                        >
                          <i className="far fa-edit" />
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn-link buttonAsLink"
                        >
                          <i className="far fa-trash-alt text-danger" />
                        </button>
                        <CoursesModalForm
                          targetName={`editModal-${course.id}`}
                          mode="edit"
                          item={course}
                          editFunction={this.props.updateCourse}
                          reloadFunction={this.props.getCourses}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Sem itens para exibir</p>
              )}
            </tbody>
          </table>
        ) : (
          <p>Sem itens para exibir</p>
        )}
      </div>
    );

    return (
      <div className="assignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Cursos</h1>
              <p className="lead text-muted">
                Cursos que fazem uso do sistema de processo seletivo
              </p>
              {addItemTool}
              {assignmentsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CoursesList.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  coursesStorage: state.coursesStorage
});

export default connect(
  mapStateToProps,
  {
    clearErrors,
    getCourses,
    createCourse,
    updateCourse
  }
)(CoursesList);
