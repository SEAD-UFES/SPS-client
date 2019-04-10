import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../../actions/userActions";
import { getProcessList } from "../../actions/processActions";

import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import DrawFilter from "components/profile/DrawFilter";

class ProcessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.props.getProcessList();
  }

  //componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    //this.props.getUserList(page, pageSize);
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
                  <th>
                    <DrawFilter permission="processo seletivo criar" anyCourse={true}>
                      <Link className="text-success" to={`${this.props.match.url}/create`}>
                        <i className="fas fa-plus-circle" />
                      </Link>
                    </DrawFilter>
                  </th>
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
                        <Link className="text-success" to={`/processes/${process.id}`}>
                          <i className="fas fa-eye" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination currentPage={processes.info.currentPage} numberOfPages={processes.info.numberOfPages} onChangePage={this.onChangePage} />
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
                <DrawFilter permission="processo seletivo criar" anyCourse={true}>
                  <Link to="/processes/create" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1" />
                    Adicionar processo
                  </Link>
                </DrawFilter>
              </div>

              {usersContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProcessList.propTypes = {
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
)(ProcessList);
