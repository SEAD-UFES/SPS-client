import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ParameterList extends Component {
  render() {
    return (
      <div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to={`${this.props.match.path}/courses`}>Cursos</Link>
          </li>
          <li className="list-group-item">
            <Link to={`${this.props.match.path}/regions`}>Regiões</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/roletypes`}>Papéis</Link>
          </li>
          <li className="list-group-item">
            <Link to={`${this.props.match.path}/restrictions`}>Retrições de Vaga</Link>
          </li>
          <li className="list-group-item">
            <Link to={`/roleassignments`}>Atribuições de papel</Link>
          </li>
        </ul>
      </div>
    );
  }
}
