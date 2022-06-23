import React from "react";
import Pikaday from "pikaday";
import moment from "moment";

/*
  this.props.onCloseClick
  this.props.card
  this.props.time
  this.props.setTime

  JavaScript Class - writing a Method

  JavaScript Object
  {
    picker: new Pikaday()

    componentDidMount: function() {
      this.picker
    }

    handlerOnClick: function() {

    }
  }

  handlerOnClick() => invoke this global execution context

  bind our this
*/

class DueDatePopover extends React.Component {
  componentDidMount() {
    this.picker = new Pikaday({
      field: document.querySelector(".datepicker-select-date input"),
      bound: false,
      container: document.getElementById("calendar-widget"),
      firstDay: 1,
      yearRange: 10,
      defaultDate: moment()
        .add(1, "day")
        .toDate(),
      setDefaultDate: true,
      format: "M/D/YYYY",
      i18n: {
        previousMonth: "Prev",
        nextMonth: "Next",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      },
      toString(date, format) {
        return moment(date).format(format);
      }
    });
    this.picker.show();
  }

  handlerOnClick(event) {
    const date = this.picker.getDate()

    let dateObject = new Date(date)
    console.log(dateObject)
    let dateTime = dateObject.setHours(10)
    console.log(dateTime)

    const time = this.props.time

  
    console.log(this.props.time)
    event.preventDefault()

  }

  render() {
    return (
      <>
        <header>
          <span>Change due date</span>
          <a href="#" className="icon-sm icon-close" onClick={this.props.onCloseClick}></a>
        </header>
        <div className="content">
          <form onSubmit={this.handlerOnClick.bind(this)}>
            <div className="datepicker-select">
              <div className="datepicker-select-date">
                <label>
                  Date
                  <input type="text" placeholder="Enter date" autoFocus />
                </label>
              </div>
              <div className="datepicker-select-time">
                <label>
                  Time 
                  <input
                    type="text"
                    placeholder="Enter time"
                    value={this.props.time}
                    onChange={(e) => this.props.setTime(e.target.value)}
                  />
                </label>
              </div>
              <div id="calendar-widget"></div>
            </div>
            <button className="button" type="submit">
              Save
            </button>
            <button className="button red-button" type="reset">
              Remove
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default DueDatePopover;
