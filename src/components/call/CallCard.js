import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import DrawFilter from "../profile/DrawFilter";

export default class CallCard extends Component {
  getCallStatus(call) {
    let statusMessage = "";

    if (moment(call.endingDate, "YYYY-MM-DDTHH:mm:ss.ssssZ") > moment()) {
      statusMessage = <span className="text-success">Chamada em andamento</span>;
    } else {
      statusMessage = <span className="text-secondary">Chamada encerrada</span>;
    }

    return statusMessage;
  }

  renderTable(process) {
    return (
      <table className="table table-hover mt-0 mb-0">
        <thead>
          <tr>
            <th>Nome</th>
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
                  {moment(call.endingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
                  {" - "}
                  {moment(call.endingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
                </td>
                <td>{this.getCallStatus(call)}</td>
                <td>
                  <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
                    <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                      <i className="fas fa-cog" />
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
