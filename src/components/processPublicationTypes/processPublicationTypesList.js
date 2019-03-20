import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProcessPublicationTypes } from "./processPublicationsActions";
import { compareBy } from "utils/compareBy";
import Spinner from "components/common/Spinner";

class ProcessPublicationTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: "",
      sortReverse: false,
      processPublicationTypesList: [],
      errors: []
    };

    this.sortBy = this.sortBy.bind(this);
    this.orderIcon = this.orderIcon.bind(this);
  }

  componentDidMount() {
    this.props.getProcessPublicationTypes();
  }

  componentWillReceiveProps(nextProps) {
    //atualizar lista
    if (nextProps.processPublicationsStore.processPublications) {
      this.setState(
        {
          sortMethod: "",
          sortReverse: false,
          processPublicationsList:
            nextProps.processPublicationsStore.processPublications
        },
        () => this.sortBy("name", { reverse: false })
      );
    }
  }

  sortBy(key = "name", options) {
    let sortMethod = this.state.sortMethod;
    let sortReverse = this.state.sortReverse;
    let arrayCopy = [...this.state.processPublicationsList];

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
      processPublicationsList: arrayCopy
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
    const { processPublicationsStore } = this.props;
    const { processPublicationsList } = this.state;

    const processPublicationsTable =
      processPublicationsStore.processPublications === null ||
      processPublicationsStore.loading ? (
        <Spinner />
      ) : processPublicationsList.length > 0 ? (
        <div>
          <h4 className="mb-2">Lista de tipos de papel</h4>
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.sortBy("name")}>
                  Nome {this.orderIcon("name")}
                </th>
                <th onClick={() => this.sortBy("description")}>
                  Descrição {this.orderIcon("description")}
                </th>
                <th>
                  <Link
                    className="text-success"
                    to="/processpublications/create"
                  >
                    <i className="fas fa-plus-circle" />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {processPublicationsList.map(processPublication => {
                return (
                  <tr key={processPublication.id}>
                    <td>{processPublication.name}</td>
                    <td>{processPublication.description}</td>
                    <td>
                      <Link
                        className="text-success"
                        to={`/processpublications/${processPublication.id}`}
                      >
                        <i className="fas fa-eye" />
                      </Link>{" "}
                      <Link
                        className="text-info"
                        to={`/processpublications/${
                          processPublication.id
                        }/update`}
                      >
                        <i className="fas fa-cog" />
                      </Link>{" "}
                      <Link
                        className="text-danger"
                        to={`/processpublications/${
                          processPublication.id
                        }/delete`}
                      >
                        <i className="fas fa-times-circle" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>
            Sem tipos de papel cadastrados.{" "}
            <Link className="text-success" to="/processpublications/create">
              <i className="fas fa-plus-circle" />
              Adicionar
            </Link>
          </p>
        </div>
      );

    const addButton = (
      <div className="btn-group mb-4" role="group">
        <Link to="/processpublications/create" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          Adicionar tipo de papel
        </Link>
      </div>
    );

    return (
      <div className="processPublicationTypes">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Tipos de publicação</h1>
              <p className="lead text-muted">
                Tipos de publicação que são feitas dentro do sistema
              </p>
              {addButton}
              {processPublicationsTable}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessPublicationTypesList.proptypes = {
  getProcessPublicationTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  processPublicationTypesStore: state.processPublicationTypesStore
});

export default connect(
  mapStateToProps,
  {
    getProcessPublicationTypes
  }
)(ProcessPublicationTypesList);
