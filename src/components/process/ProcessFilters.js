import React, { Component } from 'react'
import FilterFieldGroup from 'components/common/FilterFieldGroup_v2'

class ProcessFilters extends Component {
  renderFilterBadges(filters) {
    let indexes = Object.keys(filters)
    let resultFilters = []

    //Generate list with lists of jsx for each filter.
    for (let index of indexes) {
      let filter = filters[index]
      let resultFilter = filter
        .filter(it => {
          return it.applied === true
        })
        .map((item, key) => {
          return (
            <span key={key} className="badge badge-info mr-1">
              {item.label}{' '}
              <i
                onClick={() => {
                  this.props.onRemoveFilter(index, item.value)
                }}
                className="fas fa-times-circle"
                style={{ cursor: 'pointer' }}
              />
            </span>
          )
        })
      resultFilters.push(resultFilter)
    }

    // return each jsx on sequence
    return resultFilters
      .map(filter => {
        return filter
      })
      .map(item => {
        return item
      })
  }

  render() {
    return (
      <div className="card mb-2 px-1">
        <div className="card-body p-0">
          <div>{this.renderFilterBadges(this.props.filters)}</div>
          <div>
            <FilterFieldGroup
              id="years"
              label="Ano"
              items={this.props.filters.years}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id="graduationTypes"
              label="Nível"
              items={this.props.filters.graduationTypes}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id="courses"
              label="Curso"
              items={this.props.filters.courses}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id="assignments"
              label="Atribuição"
              items={this.props.filters.assignments}
              onChange={this.props.onCheckItem}
            />

            <input
              type="button"
              onClick={this.props.onClearFilters}
              value="Limpar filtros"
              className="btn btn-outline-info mb-1 mt-1"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ProcessFilters
