import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

export default function useApplicationData() {
  //useReducer hook
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //set application data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  //set the day
  const setDay = (day) =>
    dispatch({
      type: SET_DAY,
      value: { day },
    });

  //update the spots remaining dynamically
  const updateSpots = function (state, appointments) {
    let spots = 0;
    const dayObj = state.days.find((day) => day.name === state.day);

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = { ...dayObj, spots };
    const newDays = state.days.map((day) => (day.name === state.day ? newDay : day));

    return newDays;
  };

  //create a new interview appointment
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`http://localhost:8000/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      dispatch({ type: SET_INTERVIEW, value: { appointments, days } });
    });
  };

  //delete an interview appointment
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`http://localhost:8000/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      dispatch({ type: SET_INTERVIEW, value: { appointments, days } });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
