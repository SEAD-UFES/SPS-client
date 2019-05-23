import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList } from "../user/userActions";
import { getProcessList } from "./processActions";

import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import DrawFilter from "components/profile/DrawFilter";
// import TextFieldGroup from "components/common/TextFieldGroup";
import { validateYearRequired } from "../../validation";
// import SelectListGroup from "../common/SelectListGroup";
import FilterFieldGroup from "components/common/FilterFieldGroup";

class ProcessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //processes state
      pageOfItems: [],

      //filter state
      // formFilters: { option: "", year: "" },
      // valueOptions: [],
      // appliedFilters: { year: [] },

      // formFilters2: { option: "", value: "" },
      // appliedFilters2: [],

      avaliableFilters: { number: ["001", "002", "003"], year: ["2017", "2018", "2019"] },
      appliedFilters: { number: [], year: [] },

      filters: {
        number: [{ value: "001", applied: false }, { value: "002", applied: true }, { value: "003", applied: false }],
        year: [{ value: "2017", applied: false }, { value: "2018", applied: true }, { value: "2019", applied: false }]
      },

      //error state
      errors: {}
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);

    // this.onChangeFilter2 = this.onChangeFilter2.bind(this);
    // this.addFilter2 = this.addFilter2.bind(this);
    // this.removeFilter2 = this.removeFilter2.bind(this);
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

  updateFilters = filters => {
    this.setState({ appliedFilters: filters });
  };

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
    // const errors = this.state.errors;
    // const appliedFilters = this.state.appliedFilters;
    // const appliedFilters2 = this.state.appliedFilters2;
    let usersContent;

    // const options = [{ label: "Item", value: "" }, { label: "Número", value: "number" }, { label: "Ano", value: "year" }];

    // const numberOptions = [{ label: "Número", value: "" }];
    // const yearOptions = [{ label: "Ano", value: "" }];
    // const courseOptions = [{ label: "Curso", value: "" }];

    const filterBox = (
      <div className="card mb-2">
        <div className="card-header">
          <a data-toggle="collapse" href="#collapse1">
            Filtros
          </a>
          {": "}

          {/* {appliedFilters2.map((filter, key) => {
            return (
              <span key={key} className="badge badge-info mr-1">
                {filter.option} : {filter.value} <i onClick={() => {}} className="fas fa-times-circle" style={{ cursor: "pointer" }} />
              </span>
            );
          })} */}

          {/* {appliedFilters.year.map((year, key) => {
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
          })} */}
        </div>

        <div id="collapse1" className="panel-collapse collapse">
          <div className="card-body">
            <form onSubmit={this.addFilter}>
              <FilterFieldGroup
                label="Número"
                filters={this.state.filters.number}
                avaliableFilters={this.state.avaliableFilters.number}
                appliedFilters={this.state.appliedFilters.number}
              />
              <FilterFieldGroup
                label="Ano"
                filters={this.state.filters.year}
                avaliableFilters={this.state.avaliableFilters.year}
                appliedFilters={this.state.appliedFilters.year}
              />

              {/* <SelectListGroup name="year" value={this.state.formFilters.year} options={yearOptions} onChange={this.onChangeFilter} error={errors.year} /> */}
              {/* <SelectListGroup
                name="course"
                value={this.state.formFilters.course}
                options={courseOptions}
                onChange={this.onChangeFilter}
                error={errors.course}
              /> */}

              {/* <SelectListGroup
                name="value"
                value={this.state.formFilters.value}
                options={this.state.valueOptions}
                onChange={this.onChangeFilter2}
                error={errors.valueOptions}
              /> */}

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
                value="Aplicar filtros"
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
