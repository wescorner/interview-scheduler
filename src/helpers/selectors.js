export function getAppointmentsForDay(state, day) {
  if (!state || !day || state.days.length === 0) return [];
  const dayArr = state.days.filter((x) => x.name === day);
  if (dayArr.length === 0) return [];
  return Object.values(state.appointments).filter((appointment) =>
    dayArr[0].appointments.includes(appointment.id)
  );
}
