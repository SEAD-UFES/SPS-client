import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../../actions/userActions";
import { getProcessList } from "../../actions/processActions";

import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

class Processes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.props.getUserList();
    this.props.getProcessList();
  }

  //componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    //this.setState({ pageOfItems: pageOfItems });
    this.props.getUserList(page, pageSize);
    this.props.getProcessList(page, pageSize);
  }

  render() {
    const { processes, loading2 } = this.props.process;
    //const { users, loading } = { users: [], loading: false };
    let usersContent;

    if (processes === null || loading2) {
      usersContent = <Spinner />;
    } else {
      if (processes.selectiveProcesses.length > 0) {
        usersContent = (
          <div>
            <h4 className="mb-2">Usuários</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Ano</th>
                  <th>Curso</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {processes.selectiveProcesses.map(process => {
                  return (
                    <tr key={process.id}>
                      <td>{process.number}</td>
                      <td>{process.year}</td>
                      <td>{process.Course.name}</td>
                      <td>{process.visible ? "Visível" : "Oculto"}</td>
                      <td>
                        <Link
                          className="text-success"
                          to={`/processes/${process.id}`}
                        >
                          <i className="fas fa-info-circle" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              currentPage={processes.info.currentPage}
              numberOfPages={processes.info.numberOfPages}
              onChangePage={this.onChangePage}
            />
          </div>
        );
      }
    }

    return (
      <div className="user-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Lista de processos</h1>
              <p className="lead text-muted" />

              <div className="btn-group mb-4" role="group">
                <Link to="/processes/create" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" />
                  Adicionar processo
                </Link>
              </div>

              {usersContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Processes.propTypes = {
  getUserList: PropTypes.func.isRequired,
  getProcessList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  process: state.process
});

export default connect(
  mapStateToProps,
  { getUserList, getProcessList }
)(Processes);
