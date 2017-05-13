import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import DatePicker from './DatePicker';
import TableComponent from './TableComponent';
import TextField from './TextFieldComponent';
import Paper from 'material-ui/Paper';
import ToggleableEventButton from './ToggleableEventButton';
import BookingTableComponent from './BookingTableComponent';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    marginRight: 20,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
    width: '90%',
  },
};

export default class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (ahahha) => {
    this.setState({
      slideIndex: ahahha,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Dashboard" value={0} />
          <Tab label="Create an Event" value={1} />
          <Tab label="Options" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
              Bookings
            <h2 style={styles.headline}></h2>
				<BookingTableComponent />
          </div>
          <div style={styles.slide}>
              Events
			<TableComponent />
			<ToggleableEventButton />
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
