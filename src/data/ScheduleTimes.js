// ScheduleTimes.js
export function generateScheduleTimes() {
  const times = [];

  // Row pembuka
  times.push("06:00");

  // 07:00 sampai 22:00
  for (let h = 7; h <= 22; h++) {
    times.push(String(h).padStart(2, "0") + ":00");
  }

  // Row penutup
  times.push("23:00");

  return times;
}
