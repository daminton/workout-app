import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ date, setDate }) => {
  return <DatePicker selected={date} onChange={setDate} inline />;
};

export default DatePickerComponent;
