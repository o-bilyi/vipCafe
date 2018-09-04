import React from 'react';
// import PropTypes from 'prop-types';
import 'moment/locale/uk';
import {Input, Button} from '@material-ui/core';
import MomentLocaleUtils from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import Wrapper from 'shared/components/wrapper/Wrapper.component';

export default class ArchiveOfOrders extends React.Component {
  state = {
    from: null,
    to: null,
  };

  handleChange = (direction) => (value) => {
    this.setState({
      [direction] : value
    });
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <Wrapper>
        <div className="archive-page">
          <div className="archive-wrap">
            <div className="archive-head">
              <div className="search">
                <label htmlFor="search" className="label">Пошук по номеру чи назві:</label>
                <Input
                  placeholder="141"
                  type="search"
                  className="search-input"
                />
              </div>
              <div className="date-wrap">
                <span className="label">Пошук за період:</span>
                <div className="InputFromTo">
                  <DayPickerInput
                    value={from}
                    placeholder="From"
                    format="LL"
                    dayPickerProps={{
                      selectedDays: [from, {from, to}],
                      disabledDays: {after: to},
                      toMonth: to,
                      modifiers,
                      numberOfMonths: 1,
                      locale: 'uk',
                      localeUtils: MomentLocaleUtils,
                    }}
                    onDayChange={this.handleChange("from")}
                  />

                  <span className="arrow">/</span>

                  <span className="InputFromTo-to">
                    <DayPickerInput
                      ref={el => (this.to = el)}
                      value={to}
                      placeholder="To"
                      format="LL"
                      dayPickerProps={{
                        selectedDays: [from, {from, to}],
                        disabledDays: {before: from},
                        modifiers,
                        month: from,
                        fromMonth: from,
                        numberOfMonths: 1,
                        locale: 'uk',
                        localeUtils: MomentLocaleUtils,
                      }}
                      onDayChange={this.handleChange("to")}
                    />
                  </span>

                </div>
                <Button className="reset-date">очистити дату</Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
