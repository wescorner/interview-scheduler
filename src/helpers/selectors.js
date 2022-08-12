export function getAppointmentsForDay(state, day) {
  if (!state || !day || state.days.length === 0 || state.appointments.length === 0) return [];
  const dayObj = state.days.filter((x) => x.name === day)[0];
  if (!dayObj) return [];
  return Object.values(state.appointments).filter((appointment) =>
    dayObj.appointments.includes(appointment.id)
  );
}
