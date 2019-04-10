import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "components/common/Spinner";

import { getVacancy, deleteVacancy } from "components/vacancy/vacancyActions";

class VacancyDelete extends Component {
  constructor() {
    super();
    this.state = { errors: [] };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.vacancy_id) {
      this.props.getVacancy(this.props.match.params.vacancy_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    //error handling
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deleteVacancy(this.props.match.params.vacancy_id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`);
    });
  }

  render() {
    const { vacancy, loading } = this.props;
    const { errors } = this.state;

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div className="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro desconhecido
          </div>
        ) : (
          ""
        )}
      </div>
    );

    const infoTable =
      vacancy === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Id:</strong>
                </td>
                <td>{vacancy.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Processo:</strong>
                </td>
                <td>{`${vacancy.Call.SelectiveProcess.number}/${vacancy.Call.SelectiveProcess.year} - ${vacancy.Call.SelectiveProcess.Course.name} | Chamada ${
                  vacancy.Call.number
                }`}</td>
              </tr>
              <tr>
                <td>
                  <strong>Atribuição:</strong>
                </td>
                <td>{vacancy.Assignment.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Região:</strong>
                </td>
                <td>{vacancy.Region ? vacancy.Region.name : "Sem região"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Restrição:</strong>
                </td>
                <td>{vacancy.Restriction ? vacancy.Restriction.name : "Sem restrição"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Vagas:</strong>
                </td>
                <td>{vacancy.qtd}</td>
              </tr>
              <tr>
                <td>
                  <strong>Reserva:</strong>
                </td>
                <td>{vacancy.reserve ? "Sim" : "Não"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    const choices = (
      <div className="row">
        <div className="col">
          <input type="button" value="Excluir" className="btn btn-danger btn-block mt-4" onClick={this.onSubmit} />
        </div>
        <div className="col">
          <input
            type="button"
            value="Cancelar"
            className="btn btn-secondary btn-block mt-4"
            onClick={() => {
              this.props.history.goBack();
            }}
          />
        </div>
      </div>
    );

    return (
      <div className="roleassignments">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4 mb-4 text-center">Excluir oferta de vaga</h1>
              {alertsList}
              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>
              {choices}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VacancyDelete.propTypes = {
  getVacancy: PropTypes.func.isRequired,
  deleteVacancy: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacancy: state.vacancyStore.vacancy,
  loading: state.vacancyStore.loading
});

export default connect(
  mapStateToProps,
  {
    getVacancy,
    deleteVacancy
  }
)(VacancyDelete);
