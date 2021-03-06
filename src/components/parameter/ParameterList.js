import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ParameterList extends Component {
  render() {
    return (
      <div className="parameter-list">
        <div className="container">
          <div className="breadcrumb"></div>
          <div id="main">
            <h1>Parâmetros</h1>
            <ul>
              <li className="list-group-item">
                <Link to={`/users`}>Usuários</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/courses`}>Cursos</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/roletypes`}>Papéis</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/roleassignments`}>Atribuições de papel</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/regions`}>Polos</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/restrictions`}>Restrições de vaga</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/assignments`}>Atribuições de vaga</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/publicationtypes`}>Tipos de publicação</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/steptypes`}>Tipos de etapa</Link>
              </li>
              <li className="list-group-item">
                <Link to={`${this.props.match.path}/graduationtypes`}>Níveis de graduação</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
