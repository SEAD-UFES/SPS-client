import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../user/userActions";
import { getProcessList } from "./processActions";

import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import DrawFilter from "components/profile/DrawFilter";
import TextFieldGroup from "components/common/TextFieldGroup";
import { validateYearRequired } from "../../validation";
import SelectListGroup from "../common/SelectListGroup";

class ProcessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: [],
      formFilters: { option: "", year: "" },
      appliedFilters: { year: [] },
      errors: {}
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this.props.getProcessList();
    } else {
      this.props.getProcessList();
    }
  }

  //componentWillReceiveProps(nextProps) {}

  onChangePage(page, pageSize) {
    this.props.getProcessList(page, pageSize);
  }

  onChangeFilter(e) {
    let filters = this.state.formFilters;
    let errors = this.state.errors;
    let valResult = { error: "", isValid: true };

    switch (e.target.name) {
      case "year":
        valResult = validateYearRequired(e.target.value);
        filters.year = e.target.value;
        break;
      default:
        break;
    }

    if (!valResult.isValid) {
      errors = { ...errors, [e.target.name]: valResult.error };
    } else {
      delete errors[e.target.name];
    }

    //Atualizando os estados do campo e dos erros
    this.setState({
      formFilters: filters,
      errors: errors
    });
  }

  addFilter(e) {
    e.preventDefault();

    let new_formFilters = this.state.formFilters;
    let new_appliedFilters = this.state.appliedFilters;

    if (new_formFilters.year !== "") {
      new_appliedFilters.year.push(new_formFilters.year);
    }

    this.setState({
      appliedFilters: new_appliedFilters
    });
  }

  removeFilter(item, value) {
    let new_appliedFilters = this.state.appliedFilters;

    const index = new_appliedFilters[item].indexOf(value);
    if (index > -1) {
      new_appliedFilters[item].splice(index, 1);
    }

    this.setState({
      appliedFilters: new_appliedFilters
    });
  }

  render() {
    const { processes, loading } = this.props.processStore;
    const errors = this.state.errors;
    const appliedFilters = this.state.appliedFilters;
    let usersContent;

    const options = [{ label: "Item", value: "" }, { label: "Número", value: "number" }, { label: "Ano", value: "year" }];

    const yearOptions = [{ label: "Ano", value: "" }, { label: "2017", value: "2017" }, { label: "2018", value: "2018" }, { label: "2019", value: "2019" }];

    const filterBox = (
      <div className="card mb-2">
        <div className="card-header">
          <a data-toggle="collapse" href="#collapse1">
            Filtros
          </a>
          {": "}

          {appliedFilters.year.map((year, key) => {
            return (
              <span key={key} className="badge badge-info mr-1">
                {year}{" "}
                <i
                  onClick={() => {
                    this.removeFilter("year", year);
                  }}
                  className="fas fa-times-circle"
                  style={{ cursor: "pointer" }}
                />
              </span>
            );
          })}
        </div>

        <div id="collapse1" className="panel-collapse collapse">
          <div className="card-body">
            <form onSubmit={this.addFilter}>
              {/* <TextFieldGroup
                type="text"
                name="year"
                placeholder="Filtrar por ano"
                value={this.state.formFilters.year}
                onChange={this.onChangeFilter}
                error={errors.year}
              /> */}

              <SelectListGroup name="options" value={this.state.formFilters.option} options={options} onChange={this.onChangeFilter} error={errors.options} />
              <SelectListGroup name="year" value={this.state.formFilters.year} options={yearOptions} onChange={this.onChangeFilter} error={errors.course_id} />

              <div className="text-right d-none">
                <input ref="filterSubmit" type="submit" value="Adicionar filtros" className="btn btn-info" />
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
                value="Adicionar filtros"
                className="btn btn-info"
              />
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
  authStore: PropTypes.object.isRequired,
  processStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authStore: state.authStore,
  processStore: state.processStore
});

export default connect(
  mapStateToProps,
  { getUserList, getProcessList }
)(ProcessList);
