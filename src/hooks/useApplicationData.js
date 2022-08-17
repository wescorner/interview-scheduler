import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

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
      setState({ ...state, appointments, days });
    });
  };

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
      setState({ ...state, appointments, days });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
