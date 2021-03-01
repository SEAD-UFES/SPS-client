/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ParameterList extends Component {
  render() {
    return (
      <div className='parameter-list'>
        <div className='container'>
          <div className='breadcrumb' />
          <div id='main'>
            <h1>Parâmetros</h1>
            <ul>
              <li className='list-group-item'>
                <Link title='Lista de usuários' to={`/users`}>
                  Usuários
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de cursos' to={`${this.props.match.path}/courses`}>
                  Cursos
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de papéis' to={`${this.props.match.path}/roletypes`}>
                  Papéis
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de atribuições de papel' to={`${this.props.match.path}/roleassignments`}>
                  Atribuições de papel
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de polos' to={`${this.props.match.path}/regions`}>
                  Polos
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de restrições de vaga' to={`${this.props.match.path}/restrictions`}>
                  Restrições de vaga
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de atribuições de vaga' to={`${this.props.match.path}/assignments`}>
                  Atribuições de vaga
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de tipos de publicação' to={`${this.props.match.path}/publicationtypes`}>
                  Tipos de publicação
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de tipos de etapa' to={`${this.props.match.path}/steptypes`}>
                  Tipos de etapa
                </Link>
              </li>
              <li className='list-group-item'>
                <Link title='Lista de níveis de graduação' to={`${this.props.match.path}/graduationtypes`}>
                  Níveis de graduação
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
