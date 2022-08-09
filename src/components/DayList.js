import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <li>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </li>
    );
  });
  return <ul>{days}</ul>;
}

export default DayList;
