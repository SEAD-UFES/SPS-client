import React from "react";
// import classnames from "classnames";
import PropTypes from "prop-types";

class FilterFieldGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      markedFilters: [],
      avaliableFilters: [],
      appliedFilters: []
    };
  }

  componentWillMount() {
    this.setState({
      filters: this.props.filters,
      avaliableFilters: this.props.avaliableFilters,
      appliedFilters: this.props.appliedFilters
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters) {
      this.setState({ filters: nextProps.filters });
    }

    if (nextProps.avaliableFilters) {
      this.setState({ avaliableFilters: nextProps.avaliableFilters });
    }

    if (nextProps.appliedFilters) {
      this.setState({ appliedFilters: nextProps.appliedFilters });
    }
  }

  render() {
    const { label } = this.props;
    const { markedFilters, avaliableFilters, filters } = this.state;

    return (
      <div className="form-group dropdown cq-dropdown" data-name="statuses">
        <button
          className="btn btn-info btn-sm dropdown-toggle form-control form-control-lg"
          type="button"
          id="btndropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {label}:{" "}
          {filters.length > 0
            ? filters
                .filter(filter => {
                  filter.apllied = true;
                })
                .map((filter, key) => {
                  return <span key={key}>{filter}</span>;
                })
            : "Sem filtros aplicados."}
          <span className="caret" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="btndropdown">
          {filters.length > 0
            ? filters.map((filter, key) => {
                return (
                  <li className="dropdown-item" key={key}>
                    <label className="radio-btn">
                      <input type="checkbox" name={filter.value} defaultChecked={filter.applied} /> {filter.value}
                    </label>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }
}

FilterFieldGroup.propTypes = {
  label: PropTypes.string.isRequired
  //   placeholder: PropTypes.string,
  //   value: PropTypes.string.isRequired,
  //   info: PropTypes.string,
  //   error: PropTypes.string,
  //   onChange: PropTypes.func.isRequired,
  //   options: PropTypes.array.isRequired
};

export default FilterFieldGroup;
