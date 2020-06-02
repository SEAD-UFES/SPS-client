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
        <div className="btn-group seletor">
          <button
            className="btn exibe-filtros"
            type="button"
            id={`btndropdown-${this.props.id}`}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true">
            {label}
          </button>
          <ul className="dropdown-menu" aria-labelledby={`btndropdown-${this.props.id}`}>
            {items.length > 0
              ? items.map((item, key) => {
                  return (
                    <li className="" key={key}>
                      <label className="radio-btn">
                        <input type="checkbox" name={item.value} checked={item.marked} onChange={this.onCheck} />
                        <span>{item.label}</span>
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
