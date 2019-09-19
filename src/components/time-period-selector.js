import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { TIME_PERIOD } from '../constants';
import { colors } from '../styles/constants';

const OPTIONS = [
  { label: 'Last 24 hours', value: TIME_PERIOD.DAY },
  { label: 'Last 7 days', value: TIME_PERIOD.WEEK },
  { label: 'The last month', value: TIME_PERIOD.MONTH },
  { label: 'The last year', value: TIME_PERIOD.YEAR },
  { label: 'All time', value: TIME_PERIOD.ALL },
];

const StyledSelect = styled(Select).attrs({ classNamePrefix: 'Select' })`
  width: 100%;

  .Select__control {
    border-color: ${colors.mischka};
  }

  .Select__indicator-separator {
    background-color: ${colors.mischka};
  }

  .Select__single-value,
  .Select__dropdown-indicator,
  .Select__dropdown-indicator:hover {
    color: currentColor;
  }
`;

class TimePeriodSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    const { onChange } = this.props;

    onChange(option.value);
  }

  render() {
    const { className, defaultValue } = this.props;

    return (
      <StyledSelect
        className={className}
        controlShouldRenderValue
        defaultValue={OPTIONS.find(option => option.value === defaultValue)}
        isClearable={false}
        isSearchable={false}
        onChange={this.handleChange}
        options={OPTIONS}
      />
    );
  }
}

TimePeriodSelector.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TimePeriodSelector.defaultProps = {
  className: undefined,
};

export default TimePeriodSelector;
