import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../user/userActions";
import { getProcessList, getProcessFilters } from "./processActions";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import DrawFilter from "components/profile/DrawFilter";
import FilterFieldGroup from "components/common/FilterFieldGroup";

class ProcessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //processes state
      pageOfItems: [],

      filters: {},

      //error state
      errors: {}
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.getProcessList();
    } else {
      this.props.getProcessList();
    }
    this.props.getProcessFilters();
  }

  componentWillReceiveProps(nextProps) {
    //building filters object on state
    if (nextProps.filters) {
      const filters = nextProps.filters;
      let indexes = Object.keys(filters);
      let state_filters = {};

      for (let index of indexes) {
        const filter = filters[index];
        let state_filter = [];

        if (filter.length > 0) {
          if (typeof filter[0] !== "object") {
            state_filter = filter.map(item => {
              return { label: item, value: item, marked: false, applied: false };
            });
          } else {
            state_filter = filter.map(item => {
              return { label: item.name, value: item.id, marked: false, applied: false };
            });
          }
        }

        state_filters[index] = state_filter;
      }

      this.setState({ filters: state_filters });
    }
  }

  onChangePage(page, pageSize) {
    this.props.getProcessList(page, pageSize);
  }

  markFilter = (id, item) => {
    let list = this.state.filters[id];

    let registro = list.find(it => {
      return it.value === item;
    });
    registro.marked = !registro.marked;

    let filters = this.state.filters;
    filters[id] = list;
    this.setState({ filters: filters });
  };

  removeFilter = (id, item) => {
    let list = this.state.filters[id];

    let registro = list.find(it => {
      return it.value === item;
    });
    registro.marked = false;
    registro.applied = false;

    let filters = this.state.filters;
    filters[id] = list;
    this.setState({ filters: filters });
  };

  applyFilters = e => {
    e.preventDefault();

    let filters = this.state.filters;
    let indexes = Object.keys(filters);

    for (let index of indexes) {
      let filter = filters[index];
      filter.map(item => {
        item.applied = item.marked;
        return null;
      });
    }

    this.setState({ filters: filters });
  };

  clearFilters = e => {
    e.preventDefault();

    let filters = this.state.filters;
    let indexes = Object.keys(filters);

    for (let index of indexes) {
      let filter = filters[index];
      filter.map(item => {
        item.marked = false;
        item.applied = false;
        return null;
      });
    }

    this.setState({ filters: filters });
  };

  cancelFilters = e => {
    e.preventDefault();

    let filters = this.state.filters;
    let indexes = Object.keys(filters);

    for (let index of indexes) {
      let filter = filters[index];
      filter.map(item => {
        item.marked = item.applied;
        return null;
      });
    }

    this.setState({ filters: filters });
  };

  render() {
    const { processes, loading } = this.props.processStore;
    const { filters } = this.state;
    let usersContent;

    const renderFilterBadges = filters => {
      let indexes = Object.keys(filters);

      let resultFilters = [];

      for (let index of indexes) {
        let filter = filters[index];
        let resultFilter = filter
          .filter(it => {
            return it.applied === true;
          })
          .map((item, key) => {
            return (
              <span key={key} className="badge badge-info mr-1">
                {item.label}{" "}
                <i
                  onClick={() => {
                    this.removeFilter(index, item.value);
                  }}
                  className="fas fa-times-circle"
                  style={{ cursor: "pointer" }}
                />
              </span>
            );
          });
        resultFilters.push(resultFilter);
      }

      return resultFilters;
    };

    const filterBox = (
      <div className="card mb-2">
        <div className="card-header">
          <button className="btn btn-info mr-2" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
            <i className="fas fa-filter" />
          </button>

          {renderFilterBadges(filters)
            .map(filter => {
              return filter;
            })
            .map(item => {
              return item;
            })}
        </div>

        <div id="collapse1" className="panel-collapse collapse">
          <div className="card-body">
            <form onSubmit={this.addFilter}>
              <FilterFieldGroup id="numbers" label="Número" items={this.state.filters.numbers} onChange={this.markFilter} />
              <FilterFieldGroup id="years" label="Ano" items={this.state.filters.years} onChange={this.markFilter} />
              <FilterFieldGroup id="graduationTypes" label="Nível" items={this.state.filters.graduationTypes} onChange={this.markFilter} />
              <FilterFieldGroup id="courses" label="Curso" items={this.state.filters.courses} onChange={this.markFilter} />
              <FilterFieldGroup id="assignments" label="Atribuição" items={this.state.filters.assignments} onChange={this.markFilter} />

              <div className="d-none">
                <input ref="filterSubmit" type="submit" onClick={this.applyFilters} value="Aplicar filtros" className="btn btn-info" />
              </div>
            </form>
          </div>

          <div className="card-footer">
            <div className="text-right">
              <input
                type="button"
                onClick={() => {
                  this.refs.filterSubmit.click();
                }}
                value="Aplicar filtros"
                className="btn btn-info ml-1  mb-1"
              />
              <input type="button" onClick={this.clearFilters} value="Limpar filtros" className="btn btn-info ml-1 mb-1" />
              <input type="button" onClick={this.cancelFilters} value="Cancelar" className="btn btn-info ml-1  mb-1" />
            </div>
          </div>
        </div>
      </div>
    );

    if (processes === null || loading) {
      usersContent = <Spinner />;
    } else {
      if (processes.selectiveProcesses.length > 0) {
        usersContent = (
          <div>
            <h4 className="mb-2">Processos</h4>
            {filterBox}
            <table className="table">
              <thead>
                <tr>
                  <th>Número/Ano</th>
                  <th>Nível</th>
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
                    <tr key={process.id} className={process.visible ? "" : "text-black-50"}>
                      <td>
                        {process.number}/{process.year}
                      </td>
                      <td>{process.Course.GraduationType ? process.Course.GraduationType.name : "-"}</td>
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
  authStore: PropTypes.object.isRequired,
  processStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authStore: state.authStore,
  processStore: state.processStore,
  filters: state.processStore.filters
});

export default connect(
  mapStateToProps,
  { getUserList, getProcessList, getProcessFilters }
)(ProcessList);
