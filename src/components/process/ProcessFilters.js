/** @format */

import React, { Component } from 'react'
import FilterFieldGroup from 'components/common/FilterFieldGroup'

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
            <span key={key} className='badge badge-primary mr-1 excluir-filtro'>
              {item.label}{' '}
              <i
                onClick={() => {
                  this.props.onRemoveFilter(index, item.value)
                }}
                className='fas fa-times-circle'
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
      <div id='filtros'>
        <div id='aplicados'>{this.renderFilterBadges(this.props.filters)}</div>

        <div id='seletores'>
          <button
            id='exibe-seletores'
            ref='filterButton'
            className='btn btn-filtros'
            type='button'
            data-toggle='collapse'
            data-target='#collapse1'
            aria-expanded='false'
            aria-controls='collapse1'>
            Opções de filtro
          </button>

          <div id='collapse1' className='panel-collapse collapse'>
            <FilterFieldGroup
              id='years'
              label='Ano'
              items={this.props.filters.years}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id='graduationTypes'
              label='Nível'
              items={this.props.filters.graduationTypes}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id='courses'
              label='Curso'
              items={this.props.filters.courses}
              onChange={this.props.onCheckItem}
            />

            <FilterFieldGroup
              id='assignments'
              label='Atribuição'
              items={this.props.filters.assignments}
              onChange={this.props.onCheckItem}
            />

            <input type='button' onClick={this.props.onClearFilters} value='Limpar' className='btn' id='limpar' />
          </div>
        </div>
      </div>
    )
  }
}

export default ProcessFilters
