import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "components/common/Spinner";

import { getProcessCallVacancy, deleteProcessCallVacancy } from "components/processCallsVacancies/vacanciesActions";

class VacancyDelete extends Component {
  constructor() {
    super();
    this.state = { errors: [] };
  }

  componentDidMount() {
    if (this.props.match.params.vacancy_id) {
      this.props.getProcessCallVacancy(this.props.match.params.vacancy_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = nextProps.errors;
      this.setState({ errors: errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deleteProcessCallVacancy(this.props.match.params.vacancy_id, () => {
      this.props.history.push(`/processes/${this.props.match.params.process_id}`);
    });
  }

  render() {
    const { vacancy, loading } = this.props;
    const { errors } = this.state;

    const alertsList = (
      <div>
        {errors.serverError ? (
          <div class="alert alert-danger" role="alert">
            <strong>Erro!</strong> Erro do servidor
          </div>
        ) : (
          ""
        )}
        {errors.anotherError ? (
          <div class="alert alert-danger" role="alert">
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
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    return (
      <div className="roleassignments">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para lista de atribuição de papeis
              </Link>

              <h1 className="display-4 mb-4 text-center">Excluir atribuição de papel</h1>

              {alertsList}

              <p className="lead text-center">Você solicitou excluir o item:</p>
              {infoTable}
              <p className="lead text-center">Confirma a operação?</p>

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
                      this.props.history.push(`/processes/${this.props.match.params.process_id}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VacancyDelete.propTypes = {
  getProcessCallVacancy: PropTypes.func.isRequired,
  deleteProcessCallVacancy: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacancy: state.processCallVacanciesStore.vacancy,
  loading: state.processCallVacanciesStore.loading
});

export default connect(
  mapStateToProps,
  {
    getProcessCallVacancy,
    deleteProcessCallVacancy
  }
)(VacancyDelete);
