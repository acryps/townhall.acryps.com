// convert current real-life time into server time
// using simulated time makes prompts more accurate
export const toSimulatedTime = (date: Date) => new Date(+date * 20 - 4350 * 356 * 24 * 1000 * 1000);

export const toSimulatedAge = (date: Date) => toSimulatedTime(new Date()).getFullYear() - toSimulatedTime(date).getFullYear();
