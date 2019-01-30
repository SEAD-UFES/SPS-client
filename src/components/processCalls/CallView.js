import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class CallView extends Component {
  getCallStatus() {
    const call = this.props.call;
    let statusMessage = "";

    if (moment(call.endingDate, "YYYY-MM-DDTHH:mm:ss.ssssZ") > moment()) {
      statusMessage = "Chamada aberta";
    } else {
      statusMessage = "Chamada fechada";
    }

    return statusMessage;
  }

  render() {
    const { call } = this.props;

    const callActions = (
      <div className="btn-group mb-4" role="group">
        <Link
          to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}
          className="btn btn-light"
        >
          <i className="fas fa-user-circle text-info mr-1" /> Editar Chamada
        </Link>
        <Link
          to={`/processes/${call.selectiveProcess_id}/calls/${
            call.id
          }/steps/create`}
          className="btn btn-light"
        >
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar Etapa
        </Link>
        <a
          href="4-2-06-process-call-vacancy-add.html"
          className="btn btn-light"
        >
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar Vaga
        </a>
        <a href="4-2-08-process-publication-add.html" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar Publicação
        </a>
      </div>
    );

    const callInfo = (
      <div className="row">
        <div className="col-md-2">
          <p>
            <strong>Status:</strong>
          </p>
        </div>
        <div className="col-md-10">
          <p>{this.getCallStatus()}</p>
        </div>
      </div>
    );

    const calendarSteps = call.Steps.reduce((acumulador, step) => {
      const resultDate = (
        <tr key={`${step.id}-resultDate`}>
          <td>
            {step.stepType_id}
            {" - Resultado"}
          </td>
          <td>
            {moment(step.resultDate, "YYYY-MM-DD HH:mm:ss ").format(
              "DD/MM/YYYY"
            )}
          </td>
          <td>
            <Link
              to={`/processes/${call.selectiveProcess_id}/calls/${
                step.call_id
              }/steps/${step.id}/edit`}
            >
              <i className="far fa-edit" />
            </Link>
          </td>
        </tr>
      );
      const appealPeriod = (
        <tr key={`${step.id}-appealPeriod`}>
          <td>
            {step.stepType_id}
            {" - Período de recursos"}
          </td>
          <td>
            {moment(step.openAppealDate, "YYYY-MM-DD HH:mm:ss ").format(
              "DD/MM/YYYY"
            )}
            {" - "}
            {moment(step.limitAppealDate, "YYYY-MM-DD HH:mm:ss ").format(
              "DD/MM/YYYY"
            )}
          </td>
          <td>
            <Link
              to={`/processes/${call.selectiveProcess_id}/calls/${
                step.call_id
              }/steps/${step.id}/edit`}
            >
              <i className="far fa-edit" />
            </Link>
          </td>
        </tr>
      );
      const afterAppealResult = (
        <tr key={`${step.id}-resultAfterAppealDate`}>
          <td>
            {step.stepType_id}
            {" - Resultado pós recurso"}
          </td>
          <td>
            {moment(step.resultAfterAppealDate, "YYYY-MM-DD HH:mm:ss ").format(
              "DD/MM/YYYY"
            )}
          </td>
          <td>
            <Link
              to={`/processes/${call.selectiveProcess_id}/calls/${
                step.call_id
              }/steps/${step.id}/edit`}
            >
              <i className="far fa-edit" />
            </Link>
          </td>
        </tr>
      );
      return acumulador.concat([resultDate, appealPeriod, afterAppealResult]);
    }, []);

    const callCalendar = (
      <div>
        <h4 className="mb-2">Calendário</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data/Periodo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Periodo de inscrições</td>
              <td>
                {moment(
                  call.enrollmentOpeningDate,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD/MM/YYYY")}{" "}
                -{" "}
                {moment(
                  call.enrollmentClosingDate,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD/MM/YYYY")}
              </td>
              <td>
                <Link
                  to={`/processes/${call.selectiveProcess_id}/calls/${
                    call.id
                  }/edit`}
                >
                  <i className="far fa-edit" />
                </Link>
              </td>
            </tr>

            {calendarSteps.map(line => {
              return line;
            })}

            <tr>
              <td>Finalização da Chamada</td>
              <td>
                {moment(call.endingDate, "YYYY-MM-DD HH:mm:ss").format(
                  "DD/MM/YYYY"
                )}
              </td>
              <td>
                <Link
                  to={`/processes/${call.selectiveProcess_id}/calls/${
                    call.id
                  }/edit`}
                >
                  <i className="far fa-edit" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        {callActions}
        {callInfo}
        {callCalendar}
      </div>
    );
  }
}

export default CallView;
