import React from 'react';
import PropTypes from 'prop-types';

import {Input, TextField, Button, withStyles} from '@material-ui/core';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ArchiveOfOrders extends React.Component {
  state = {
    firstDate : '',
    secondDate : '',
  };
  handleDateChange = (date,firstDate) => {
    if(firstDate){
      this.setState({ firstDate: date.target.value });
    }else {
      this.setState({ secondDate: date.target.value });
    }
  };

  render() {
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
                <div className="first-date">
                  <TextField
                    type="date"
                    id="first-date"
                    InputProps={{
                      classes: {
                        root: 'date-input-wrap',
                        input: 'date-input',
                      },
                    }}
                    onChange={date => this.handleDateChange(date, true)}
                  />
                </div>
                <div className="second-date">
                  <TextField
                    type="date"
                    id="second-date"
                    InputProps={{
                      classes: {
                        root: 'date-input-wrap',
                        input: 'date-input',
                      },
                    }}
                    onChange={date => this.handleDateChange(date, false)}
                  />
                </div>
                <Button className="reset-date">очистити дату</Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

ArchiveOfOrders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArchiveOfOrders);