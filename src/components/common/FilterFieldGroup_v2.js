import React from 'react'
// import classnames from "classnames";
import PropTypes from 'prop-types'

class FilterFieldGroup extends React.Component {
  constructor() {
    super()
    this.onCheck = this.onCheck.bind(this)
  }

  onCheck(e) {
    this.props.onChange(this.props.id, e.target.name)
  }

  render() {
    const { label, items } = this.props

    return (
      <React.Fragment>
        <div className="btn-group d-table-cell pr-1">
          <button
            className="btn btn-outline-primary btn-block mt-1 mb-1 mr-1 dropdown-toggle text-truncate"
            type="button"
            id={`btndropdown-${this.props.id}`}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true">
            {label}
            <span className="caret" />
          </button>
          <ul className="dropdown-menu" aria-labelledby={`btndropdown-${this.props.id}`}>
            {items.length > 0
              ? items.map((item, key) => {
                  return (
                    <li className="dropdown-item" key={key}>
                      <label className="radio-btn">
                        <input type="checkbox" name={item.value} checked={item.marked} onChange={this.onCheck} />{' '}
                        {item.label}
                      </label>
                    </li>
                  )
                })
              : ''}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

FilterFieldGroup.defaultProps = {
  items: []
}

FilterFieldGroup.propTypes = {
  label: PropTypes.string.isRequired
  //   placeholder: PropTypes.string,
  //   value: PropTypes.string.isRequired,
  //   info: PropTypes.string,
  //   error: PropTypes.string,
  //   onChange: PropTypes.func.isRequired,
  //   options: PropTypes.array.isRequired
}

export default FilterFieldGroup
