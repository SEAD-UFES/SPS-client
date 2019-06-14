import React from "react";
// import classnames from "classnames";
import PropTypes from "prop-types";

class FilterFieldGroup extends React.Component {
  constructor() {
    super();

    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(e) {
    this.props.onChange(this.props.id, e.target.name);
  }

  render() {
    const { label, items } = this.props;

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
          {items.find(it => {
            return it.marked === true;
          })
            ? items
              .filter(item => {
                return item.marked === true;
              })
              .map((item, key) => {
                return (
                  <span className="badge badge-info mr-1" key={key}>
                    {item.label}
                  </span>
                );
              })
            : ""}
          <span className="caret" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="btndropdown">
          {items.length > 0
            ? items.map((item, key) => {
              return (
                <li className="dropdown-item" key={key}>
                  <label className="radio-btn">
                    <input type="checkbox" name={item.value} checked={item.marked} onChange={this.onCheck} /> {item.label}
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


FilterFieldGroup.defaultProps = {
  items: []
};

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
