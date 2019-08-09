import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import DrawFilter from "../profile/DrawFilter";
import { getCallStatus } from "./callHelpers";

export default class CallCard extends Component {
  renderTable(process) {
    return (
      <table className="table table-hover mt-0 mb-0">
        <thead>
          <tr>
            <th>Número</th>
            <th>Periodo</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {process.Calls.map(call => {
            return (
              <tr key={call.id}>
                <td>{call.number}</td>
                <td>
                  {moment(call.openingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
                  {" - "}
                  {moment(call.endingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
                </td>
                <td>{getCallStatus(call)}</td>
                <td className="text-right">
                  <DrawFilter permission="chamada acessar" course_id={process.Course.id}>
                    <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}`}>
                      <i className="fas fa-search-plus" />
                    </Link>
                  </DrawFilter>{" "}
                  <DrawFilter permission="chamada editar" course_id={process.Course.id}>
                    <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                      <i className="fas fa-cog" />
                    </Link>
                  </DrawFilter>{" "}
                  <DrawFilter permission="chamada apagar" course_id={process.Course.id}>
                    <Link className="text-danger" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/delete`}>
                      <i className="fas fa-times-circle" />
                    </Link>
                  </DrawFilter>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Chamadas</h4>
            </div>
            <div className="col">
              <div className="float-right">
                <DrawFilter permission="chamada criar" course_id={this.props.process.Course.id}>
                  <Link className="text-success" to={`/processes/${this.props.process.id}/calls/create`}>
                    <i className="fas fa-plus-circle" /> Adicionar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          {this.props.process.Calls.length > 0 ? this.renderTable(this.props.process) : <p className="mb-0">Sem chamadas cadastradas.</p>}
        </div>
      </div>
    );
  }
}
