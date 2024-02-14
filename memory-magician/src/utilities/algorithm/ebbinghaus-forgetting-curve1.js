
/**
 * Generates all review dates based on the provided start date and intervals.
 * @param {string} reviewDate - The starting date in ISO string format for generating review dates.
 * e.g. 2024-02-04T22:15:52.019Z
 * @param {number[]} [intervals=[0, 1, 5, 10, 20, 30, 45, 60, 90, 120, 150]] 
 *  - An array of intervals (in days) for review dates. If not provided, defaults to a predefined set of intervals.
 * @returns {string[]} An array of review dates in ISO string format.
 */
export const generateAllReviewDates = (todayDate, intervals = [0, 1, 5, 10, 20, 30, 45, 60, 90, 120, 150]) => {
  return intervals.map(interval => {
    let date = new Date(todayDate); // Create a new Date object for each interval
    date.setDate(date.getDate() + interval); // Add the interval to the new date
    return date.toISOString(); // Convert to ISO string format
  });
}

/**
 * repeat a card 20 times periodically, starting from todayDate
 * 
 * @param {*} todayDate e.g. '2024-02-04T00:00:00.000Z'
 * @param {*} n repeat every n days
 */
export const generateDatesForPeriodicCards = (todayDate, n) => {
  const date = new Date(todayDate)
  const periodicDates = []
  for (let i = 0; i < 20; i++) {
    const nextDate = new Date(todayDate)
    nextDate.setDate(date.getDate() + i * n)
    periodicDates.push(nextDate.toISOString())
  }
  return periodicDates
}

/**
 * generate 90 dates
 * 
 * @param {*} todayDate '2024-02-04T00:00:00.000Z'
 */
export const generateDatesForDailyCards = (todayDate) => {
  const date = new Date(todayDate)
  const dailyDates = []
  for (let i = 0; i < 90; i++) {
    const nextDate = new Date(todayDate)
    nextDate.setDate(date.getDate() + i)
    dailyDates.push(nextDate.toISOString())
  }
  return dailyDates
}

