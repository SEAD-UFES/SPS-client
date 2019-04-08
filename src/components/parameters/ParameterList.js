import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ParameterList extends Component {
  render() {
    return (
      <div className="parameter-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Parâmetros</h1>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to={`${this.props.match.path}/courses`}>Cursos</Link>
                </li>
                <li className="list-group-item">
                  <Link to={`/roletypes`}>Papéis</Link>
                </li>
                <li className="list-group-item">
                  <Link to={`/roleassignments`}>Atribuições de papel</Link>
                </li>
                <li className="list-group-item">
                  <Link to={`${this.props.match.path}/regions`}>Regiões</Link>
                </li>
                <li className="list-group-item">
                  <Link to={`${this.props.match.path}/restrictions`}>Retrições de vaga</Link>
                </li>
                <li className="list-group-item">
                  <Link to={`${this.props.match.path}/assignments`}>Atribuições de vaga</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
