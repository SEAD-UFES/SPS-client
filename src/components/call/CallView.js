import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import AlertError from "components/common/AlertError";
import Spinner from "components/common/Spinner";
import { getCall } from "components/call/callActions";
import { clearErrors } from "actions/errorActions";
import DrawFilter from "components/profile/DrawFilter";
import { getCallStatus } from "./callHelpers";

class CallView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCall(this.props.match.params.call_id);
  }

  componentWillReceiveProps(nextProps) {}

  renderInfo(call, loading) {
    if (call === null || loading) {
      return <Spinner />;
    }

    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Informações</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <DrawFilter permission="chamada editar" course_id={call.course_id}>
                  {" "}
                  {/*course_id temporario*/}
                  <Link className="text-info" to={`/processes/${call.selectiveProcess_id}/calls/${call.id}/edit`}>
                    <i className="fas fa-cog" /> Editar
                  </Link>
                </DrawFilter>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-hover mt-0 mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Número:</strong>
                </td>
                <td>{call.number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Abertura:</strong>
                </td>
                <td>{moment(call.endingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                <td>
                  <strong>Encerramento:</strong>
                </td>
                <td>{moment(call.endingDate, "YYYY-MM-DD HH:mm:ss ").format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{getCallStatus(call)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderVacancys(vacancys) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Oferta de vagas</h4>
            </div>
            <div className="col">
              <div className="text-right">
                <Link className="text-success" to={`/processes/${"XXX"}/calls/${"XXX"}/edit`}>
                  <i className="fas fa-plus-circle" /> Adicionar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body"> uaga uaga uaga</div>
      </div>
    );
  }

  render() {
    const { errors, call, loading } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/processes/${this.props.match.params.process_id}`} className="btn btn-light">
                Voltar para o processo
              </Link>
              <h1 className="display-4">Chamada</h1>
              <AlertError errors={errors} />
              {this.renderInfo(call, loading)}
              {this.renderVacancys()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Call Edit props
CallView.proptypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCall: PropTypes.func.isRequired,
  call: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired
};

// Put redux store data on props
const mapStateToProps = state => ({
  errors: state.errorStore,
  call: state.callStore.call,
  loading: state.callStore.loading
});

//Connect actions to redux with connect -> actions -> Reducer -> Store
export default connect(
  mapStateToProps,
  { getCall, clearErrors }
)(withRouter(CallView));
