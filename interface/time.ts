// convert current real-life time into server time
// using simulated time makes prompts more accurate
export const toSimulatedTime = (date: Date) => new Date(+date * 20 - 4350 * 356 * 24 * 1000 * 1000);

export const toSimulatedAge = (date: Date, base = new Date()) => toSimulatedTime(base).getFullYear() - toSimulatedTime(date).getFullYear();

export const toRealTime = (simulated: Date) => new Date((+simulated + 4350 * 356 * 24 * 1000 * 1000) / 20);
