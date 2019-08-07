import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import DrawFilter from "../profile/DrawFilter";

export default class CallCard extends Component {
  renderPublicationLevel(process, publication) {
    let result = "Edital";

    if (publication.call_id) {
      result = `${result} | Chamada`;

      const filterCall = value => {
        return value.id === publication.call_id;
      };
      const call = process.Calls.find(filterCall);
      if (call) {
        result = `${result} ${call.number}`;

        if (publication.step_id) {
          result = `${result} | Etapa`;
          const filterStep = value => {
            return value.id === publication.step_id;
          };
          const step = call.Steps.find(filterStep);
          if (step) {
            result = `${result} ${step.number}`;
          }
        }
      }
    }

    return result;
  }

  renderTable(process) {
    return (
      <div className="table-responsive">
        <table className="table table-hover mt-0 mb-0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Nível</th>
              <th>Tipo</th>
              <th>Observações</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {process.Publications.map(publication => {
              return (
                <tr key={publication.id} className={publication.valid ? "" : "text-secondary"}>
                  <td>{moment(publication.date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</td>
                  <td>{this.renderPublicationLevel(process, publication)}</td>
                  <td>{publication.PublicationType.name}</td>
                  <td>{publication.description ? publication.description : ""}</td>
                  <td>
                    <a
                      className={publication.valid ? "" : "isDisabled"}
                      onClick={publication.valid ? e => {} : e => e.preventDefault()}
                      href={publication.valid ? `http://localhost:3000/v1/publications/download/${publication.file}` : ""}
                    >
                      <i class="fas fa-file-download" />
                    </a>{" "}
                    <DrawFilter permission="publication_update" course_id={process.Course.id}>
                      <Link
                        className="text-info"
                        to={{ pathname: `/processes/${process.id}/publications/${publication.id}/update`, state: { publication: publication } }}
                      >
                        <i className="fas fa-cog" />
                      </Link>
                    </DrawFilter>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Publicações</h4>
            </div>
            <div className="col">
              <div className="float-right">
                <DrawFilter permission="publication_create" course_id={this.props.process.Course.id}>
                  <Link
                    className="text-success mb-0"
                    to={{
                      pathname: `/processes/${this.props.process.id}/publications/create`,
                      state: { selectiveProcess: this.props.process }
                    }}
                  >
                    <i className="fas fa-plus-circle" /> Adicionar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          {this.props.process.Calls.length > 0 ? this.renderTable(this.props.process) : <p className="mb-0">Sem publicações cadastradas.</p>}
        </div>
      </div>
    );
  }
}