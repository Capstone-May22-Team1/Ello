import React from "react";
import Pikaday from "pikaday";
import moment from "moment";
import { updateCard } from "../../../features/boards/cards";

class DueDatePopover extends React.Component {
  componentDidMount() {
    this.picker = new Pikaday({
      field: document.querySelector(".datepicker-select-date input"),
      bound: false,
      container: document.getElementById("calendar-widget"),
      firstDay: 1,
      yearRange: 10,
      keyboardInput: false,
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
    event.preventDefault()
    const dispatch = this.props.dispatch

    let dueDate = this.getSelectedDate()
    
    let cardId = this.props.card._id
    let updatedCard = {
      card: {
        dueDate
      }
    }

    dispatch(updateCard({ cardId, updatedCard, callback: this.props.onCloseClick }))
  }

  getSelectedDate() {
    const date = this.picker.getDate()
    const dateString = date.toString()

    const time = this.checkTimeFormat(this.props.time)

    const dateStringArray = dateString.split(' ').slice(0, 4)
    dateStringArray.push(time)

    const fullDateString = dateStringArray.join(' ')
    const fullDateObject = new Date(fullDateString)

    return fullDateObject

  }


  checkTimeFormat(time) {
    if (time.slice(-3)[0] === ' ') {
      return time
    } else {
      let AMPM = time.slice(-2)
      let numbers = time.slice(0, -2)
      let correctTime = `${numbers} ${AMPM}`
      return correctTime
    }
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
