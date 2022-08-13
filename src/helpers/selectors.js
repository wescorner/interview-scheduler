export function getAppointmentsForDay(state, day) {
  if (!state || !day || state.days.length === 0 || state.appointments.length === 0) return [];
  const dayObj = state.days.find((x) => x.name === day);
  if (!dayObj) return [];
  return Object.values(state.appointments).filter((appointment) =>
    dayObj.appointments.includes(appointment.id)
  );
}

export function getInterview(state, interview) {
  if (!interview) return null;
  return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
}

export function getInterviewersForDay(state, day) {
  if (!state || !day || state.days.length === 0 || !state.interviewers) return [];
  const dayObj = state.days.find((x) => x.name === day);
  if (!dayObj || !dayObj.interviewers) return [];
  return dayObj.interviewers.map((id) => {
    return state.interviewers[id];
  });
}
