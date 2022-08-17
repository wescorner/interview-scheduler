import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  //*old useState
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = function (state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, ...action.value };
      case SET_APPLICATION_DATA:
        return { ...state, ...action.value };
      case SET_INTERVIEW:
        return { ...state, ...action.value };
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  };

  //*new useReducer
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //*old state version
  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers"),
  //   ]).then((all) => {
  //     setState((prev) => ({
  //       ...prev,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data,
  //     }));
  //   });
  // }, []);

  //*new reducer version
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

  //*old state version
  // const setDay = (day) => setState({ ...state, day });

  //*new reducer version
  const setDay = (day) =>
    dispatch({
      type: SET_DAY,
      value: { day },
    });

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

  //*old state version
  // const bookInterview = function (id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };

  //   return axios.put(`http://localhost:8000/api/appointments/${id}`, { interview }).then(() => {
  //     const days = updateSpots(state, appointments);
  //     setState({ ...state, appointments, days });
  //   });
  // };

  //*new reducer version
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

  //*old state version
  // const cancelInterview = function (id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null,
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };
  //   return axios.delete(`http://localhost:8000/api/appointments/${id}`).then(() => {
  //     const days = updateSpots(state, appointments);
  //     setState({ ...state, appointments, days });
  //   });
  // };

  //*new reducer version
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
