import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getRoleTypes
  // createCourse,
  // updateCourse,
  // deleteCourse
} from "./roleTypesActions";
import { compareBy } from "utils/compareBy";

class RoleTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      roleTypesList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.getRoleTypes();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.roleTypesStore.roleTypes) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          roleTypesList: nextProps.roleTypesStore.roleTypes
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
  }

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.roleTypesList];

    //Determinar se é ordem é forçada.
    if (options && options.reverse) {
      sortReverse = options.reverse;
    } else {
      //Se o método está sendo aplicado novamente na mesma key
      if (sortMethod === key) {
        sortReverse = sortReverse ? false : true;
      }
    }

    arrayCopy.sort(compareBy(key));

    if (sortReverse) {
      arrayCopy.reverse();
    }

    this.setState({
      sortMethod: key,
      sortReverse: sortReverse,
      roleTypesList: arrayCopy
    });
  }

  orderIcon(key) {
    if (this.state.sortMethod === key) {
      if (this.state.sortReverse === false) {
        return <i className="fas fa-arrow-up" />;
      } else {
        return <i className="fas fa-arrow-down" />;
      }
    }
    return null;
  }

  render() {
    //const { roleTypesList } = this.state;

    //Add item - form
    // const addItemTool = (
    //   <div>
    //     <div className="mb-2">
    //       <button
    //         type="button"
    //         className="btn btn-info"
    //         data-toggle="modal"
    //         data-target="#addModal"
    //       >
    //         + Adicionar curso
    //       </button>
    //     </div>

    //     {/* <RoleTypesModalForm
    //       mode="add"
    //       targetName="addModal"
    //       addFunction={this.props.createRoleType}
    //       reloadFunction={this.props.getRoleTypes}
    //     /> */}
    //   </div>
    // );

    // //item list
    // const roleTypesTable = (
    //   <div>
    //     <h4 className="mb-2">Lista de cursos</h4>
    //     {RoleTypesList ? (
    //       <table className="table">
    //         <thead>
    //           <tr>
    //             <th onClick={() => this.sortBy("name")}>
    //               Nome {this.orderIcon("name")}
    //             </th>
    //             <th onClick={() => this.sortBy("description")}>
    //               Descrição {this.orderIcon("description")}
    //             </th>
    //             <th>Opções</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {roleTypesList.length > 0 ? (
    //             roleTypesList.map(roleType => {
    //               return (
    //                 <tr key={roleType.id}>
    //                   <td>{roleType.name}</td>
    //                   <td>
    //                     {roleType.description ? (
    //                       roleType.description
    //                     ) : (
    //                       <span className="text-muted">Sem descrição.</span>
    //                     )}
    //                   </td>
    //                   <td>
    //                     <button
    //                       type="button"
    //                       className="btn btn-link buttonAsLink text-info"
    //                       data-toggle="modal"
    //                       data-target={`#editModal-${roleType.id}`}
    //                     >
    //                       <i className="far fa-edit" />
    //                     </button>
    //                     <RoleTypesModalForm
    //                       targetName={`editModal-${roleType.id}`}
    //                       mode="edit"
    //                       item={roleType}
    //                       editFunction={this.props.updateRoleType}
    //                       reloadFunction={this.props.getRoleTypes}
    //                     />{" "}
    //                     <button
    //                       type="button"
    //                       className="btn btn-link buttonAsLink"
    //                       data-toggle="modal"
    //                       data-target={`#deleteModal-${roleType.id}`}
    //                     >
    //                       <i className="far fa-trash-alt text-danger" />
    //                     </button>
    //                     <RoleTypesModalDelete
    //                       targetName={`deleteModal-${roleType.id}`}
    //                       item={roleType}
    //                       deleteFunction={this.props.deleteRoleType}
    //                       reloadFunction={this.props.getRoleTypes}
    //                     />
    //                   </td>
    //                 </tr>
    //               );
    //             })
    //           ) : (
    //             <tr>
    //               <td colSpan="3">Sem itens para exibir</td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <tr>
    //         <td colSpan="3">Sem itens para exibir</td>
    //       </tr>
    //     )}
    //   </div>
    // );

    return (
      <div className="assignments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Tipos de papel</h1>
              <p className="lead text-muted">
                Papéis que podem ser atribuidos a usuários dentro do sistema
              </p>
              {/* {addItemTool} */}
              {/* {roleTypesTable} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RoleTypesList.proptypes = {
  // clearErrors: PropTypes.func.isRequired,
  // getRoleTypes: PropTypes.func.isRequired,
  // createRoleType: PropTypes.func.isRequired,
  // updateRoleType: PropTypes.func.isRequired,
  // deleteRoleType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  //roleTypesStore: state.roleTypesStore
});

export default connect(
  mapStateToProps,
  {
    // clearErrors,
    getRoleTypes
    // createRoleType,
    // updateRoleType,
    // deleteRoleType
  }
)(RoleTypesList);
