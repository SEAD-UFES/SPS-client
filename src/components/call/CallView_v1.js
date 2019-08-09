import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import DrawFilter from "components/profile/DrawFilter";

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
        <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
          <Link to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" /> Editar Chamada
          </Link>
        </DrawFilter>
        <DrawFilter permission="etapa criar" course_id={this.props.course_id}>
          <Link to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/steps/create`} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" />
            Adicionar Etapa
          </Link>
        </DrawFilter>
        <DrawFilter permission="vaga criar" course_id={this.props.course_id}>
          <Link to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/create`} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" />
            Adicionar Vaga
          </Link>
        </DrawFilter>
        <DrawFilter permission="publication_create" course_id={this.props.course_id}>
          <Link to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/publications/create`} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" />
            Adicionar Publicação
          </Link>
        </DrawFilter>
      </div>
    );

    const callInfo = (
      <div>
        <h4 className="mb-2">
          Informações da chamada{" "}
          <small>
            <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
              <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                <i className="fas fa-cog" />
              </Link>
            </DrawFilter>
          </small>
        </h4>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>Status:</strong>
              </td>
              <td>{this.getCallStatus()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    const calendarSteps = call.Steps.reduce((acumulador, step) => {
      const resultDate = (
        <tr key={`${step.id}-resultDate`}>
          <td>
            {`Etapa ${step.number} | `}
            {step.StepType.name}
            {" - Resultado"}
          </td>
          <td>{moment(step.resultDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}</td>
          <td>
            <DrawFilter permission="etapa editar" course_id={this.props.course_id}>
              <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${step.call_id}/steps/${step.id}/edit`}>
                <i className="fas fa-cog" />
              </Link>
            </DrawFilter>
          </td>
        </tr>
      );

      const appealPeriod = (
        <tr key={`${step.id}-appealPeriod`}>
          <td>
            {`Etapa ${step.number} | `}
            {step.StepType.name}
            {" - Período de recursos"}
          </td>
          <td>
            {moment(step.openAppealDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
            {" - "}
            {moment(step.limitAppealDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}
          </td>
          <td>
            <DrawFilter permission="etapa editar" course_id={this.props.course_id}>
              <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${step.call_id}/steps/${step.id}/edit`}>
                <i className="fas fa-cog" />
              </Link>
            </DrawFilter>
          </td>
        </tr>
      );

      const afterAppealResult = (
        <tr key={`${step.id}-resultAfterAppealDate`}>
          <td>
            {`Etapa ${step.number} | `}
            {step.StepType.name}
            {" - Resultado pós recurso"}
          </td>
          <td>{moment(step.resultAfterAppealDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}</td>
          <td>
            <DrawFilter permission="etapa editar" course_id={this.props.course_id}>
              <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${step.call_id}/steps/${step.id}/edit`}>
                <i className="fas fa-cog" />
              </Link>
            </DrawFilter>
          </td>
        </tr>
      );
      return acumulador.concat([resultDate, appealPeriod, afterAppealResult]);
    }, []);

    const callCalendar = (
      <div>
        <h4 className="mb-2">Etapas e calendário da chamada</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data/Periodo</th>
              <th>
                <DrawFilter permission="etapa criar" course_id={this.props.course_id}>
                  <Link className="text-success" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/steps/create`}>
                    <i className="fas fa-plus-circle" />
                  </Link>
                </DrawFilter>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Periodo de inscrições</td>
              <td>
                {moment(call.enrollmentOpeningDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")} -{" "}
                {moment(call.enrollmentClosingDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}
              </td>
              <td>
                <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
                  <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                    <i className="fas fa-cog" />
                  </Link>
                </DrawFilter>
              </td>
            </tr>

            {calendarSteps.map(line => {
              return line;
            })}

            <tr>
              <td>Finalização da Chamada</td>
              <td>{moment(call.endingDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</td>
              <td>
                <DrawFilter permission="chamada editar" course_id={this.props.course_id}>
                  <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                    <i className="fas fa-cog" />
                  </Link>
                </DrawFilter>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    const callVacancies = (
      <div>
        <h4 className="mb-2">Oferta de vagas da chamada</h4>
        {call.Vacancies.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Atribuição</th>
                <th>Local</th>
                <th>Restrição</th>
                <th>Vagas</th>
                <th>Reserva</th>
                <th>
                  <DrawFilter permission="vaga criar" course_id={this.props.course_id}>
                    <Link className="text-success" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/create`}>
                      <i className="fas fa-plus-circle" />
                    </Link>
                  </DrawFilter>
                </th>
              </tr>
            </thead>
            <tbody>
              {call.Vacancies.map(vacancy => {
                return (
                  <tr key={vacancy.id}>
                    <td>{vacancy.Assignment.name}</td>
                    <td>{vacancy.Region ? vacancy.Region.name : "Sem região"}</td>
                    <td>{vacancy.Restriction ? vacancy.Restriction.name : "Sem restrições"}</td>
                    <td>{vacancy.qtd}</td>
                    <td>{vacancy.reserve ? "C.R." : "Não"}</td>
                    <td>
                      <DrawFilter permission="vaga editar" course_id={this.props.course_id}>
                        <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/${vacancy.id}/edit`}>
                          <i className="fas fa-cog" />
                        </Link>
                      </DrawFilter>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>
            Esta chamada não possui ofertas de vagas cadastradas.{" "}
            <DrawFilter permission="vaga criar" course_id={this.props.course_id}>
              <Link className="text-success" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/vacancies/create`}>
                <i className="fas fa-plus-circle" />
                Adicionar
              </Link>
            </DrawFilter>
          </p>
        )}
      </div>
    );

    const stepNumber = step_id => {
      const step = call.Steps.filter(value => {
        return value.id === step_id;
      });
      if (step.length > 0) {
        return step[0].number ? step[0].number : "";
      } else {
        return "";
      }
    };

    const callPublications = (
      <div>
        <h4 className="mb-2">Publicações da chamada</h4>
        {this.props.publications.length > 0 ? (
          <div>
            <p className="ml-4 mt-3">
              <DrawFilter permission="publication_create" course_id={this.props.course_id}>
                <Link
                  className="text-success"
                  to={{
                    pathname: `/processes/${call.selectiveProcess_id}/calls/${call.id}/publications/create`
                  }}
                >
                  <i className="fas fa-plus-circle" /> Adicionar
                </Link>
              </DrawFilter>
            </p>

            <ul className="timeline">
              {this.props.publications.map(publication => {
                return (
                  <li key={publication.id}>
                    <a
                      className={publication.valid ? "" : "isDisabled"}
                      onClick={publication.valid ? e => {} : e => e.preventDefault()}
                      href={publication.valid ? `http://localhost:3000/v1/publications/download/${publication.file}` : ""}
                    >
                      {moment(publication.date, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}{" "}
                      {publication.step_id ? `| Etapa ${stepNumber(publication.step_id)} ` : ""}| {publication.PublicationType.name}
                    </a>{" "}
                    <DrawFilter permission="publication_update" course_id={this.props.course_id}>
                      <Link
                        className="text-info"
                        to={{
                          pathname: `/processes/${publication.selectiveProcess_id}/calls/${publication.call_id}/publications/${publication.id}/update`,
                          state: { publication: publication }
                        }}
                      >
                        <i className="fas fa-cog" />
                      </Link>
                    </DrawFilter>
                    {publication.description ? <p>{publication.description}</p> : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>
            Sem publicações de chamada cadastradas.{" "}
            <DrawFilter permission="publication_create" course_id={this.props.course_id}>
              <Link className="text-success" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/publications/create`}>
                <i className="fas fa-plus-circle" />
                Adicionar
              </Link>
            </DrawFilter>
          </p>
        )}
      </div>
    );

    return (
      <div>
        {callActions}
        {callInfo}
        {callCalendar}
        {callVacancies}
        {callPublications}
      </div>
    );
  }
}

export default CallView;
