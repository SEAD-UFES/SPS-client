import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRoleType } from "./roleTypesActions";
import Spinner from "components/common/Spinner";
import CallTabList from "../processCalls/CallTabList";

class RoleTypeView extends Component {
  componentDidMount() {
    if (this.props.match.params.roletype_id) {
      this.props.getRoleType(this.props.match.params.roletype_id);
    }
  }

  render() {
    const { roleTypesStore } = this.props;

    const infoTable =
      roleTypesStore.roleType === null || roleTypesStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Informações</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Nome:</strong>
                </td>
                <td>{roleTypesStore.roleType.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Descrição:</strong>
                </td>
                <td>{roleTypesStore.roleType.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    const permissionsTable =
      roleTypesStore.roleType === null || roleTypesStore.loading ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="mb-2">Lista de permissões</h4>
        </div>
      );

    return (
      <div className="roletypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/roletypes" className="btn btn-light">
                Voltar para lista de tipos de papel
              </Link>
              <h1 className="display-4 mb-4">Tipo de Papel</h1>
              {infoTable}
              {permissionsTable}
            </div>
          </div>
        </div>
      </div>
    );
    // const { process, loading } = this.props.process;

    // let processContent;
    // if (process === null || loading) {
    //   processContent = <Spinner />;
    // } else {
    //   processContent = (
    //     <div>
    //       {/* <!-- Process basic data --> */}
    //       <p className="lead text-muted">
    //         {`${process.number}/${process.year} - ${process.Course.name}`}
    //       </p>

    //       {/* <!-- Process Actions --> */}
    //       <div className="btn-group mb-4" role="group">
    //         <Link
    //           to={`/processes/${process.id}/edit`}
    //           className="btn btn-light"
    //         >
    //           <i className="fas fa-user-circle text-info mr-1" /> Editar
    //           Processo
    //         </Link>
    //         <Link
    //           to={`/processes/${process.id}/calls/create`}
    //           className="btn btn-light"
    //         >
    //           <i className="fas fa-user-circle text-info mr-1" /> Adicionar
    //           Chamada
    //         </Link>
    //         <Link
    //           to={`/processes/${process.id}/add-publication`}
    //           className="btn btn-light"
    //         >
    //           <i className="fas fa-user-circle text-info mr-1" /> Adicionar
    //           Publicação
    //         </Link>
    //       </div>

    //       {/* <!-- Dados do processo --> */}
    //       <div>
    //         <h4 className="mb-2">Dados do processo</h4>

    //         <div className="row">
    //           <div className="col-md-2">
    //             <p>
    //               <strong>Número/Ano:</strong>
    //             </p>
    //           </div>
    //           <div className="col-md-10">
    //             <p>
    //               {process.number}/{process.year}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-md-2">
    //             <p>
    //               <strong>Curso:</strong>
    //             </p>
    //           </div>
    //           <div className="col-md-10">
    //             <p>{process.Course.name}</p>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-md-2">
    //             <p>
    //               <strong>Visibilidade:</strong>
    //             </p>
    //           </div>
    //           <div className="col-md-10">
    //             <p>
    //               {process.visible ? "Processo visível" : "Processo oculto"}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-md-2">
    //             <p>
    //               <strong>Descrição:</strong>
    //             </p>
    //           </div>
    //           <div className="col-md-10">
    //             <p>{process.description}</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Call Tab List */}
    //       <CallTabList calls={process.Calls} />
    //     </div>
    //   );
    // }
    // return (
    //   <div className="profile">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-12">
    //           <Link to="/processes" className="btn btn-light">
    //             Voltar para lista de processos
    //           </Link>
    //           <h1 className="display-4">Processo seletivo</h1>
    //           {processContent}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

RoleTypeView.propTypes = {
  // getProcess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  roleTypesStore: state.roleTypesStore
});

export default connect(
  mapStateToProps,
  {
    getRoleType
  }
)(RoleTypeView);
