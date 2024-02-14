
/**
 * Generates all review dates based on the provided start date and intervals.
 * @param {string} todayDate - utc format date
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
 * @param {*} utcStartDateString e.g. '2024-02-04T00:00:00.000Z'
 * @param {*} n repeat every n days
 * @return {*} dates returning are in utc time zone 
 */
export const generateDatesForPeriodicCards = (utcStartDateString, n) => {
  const utcStartDate = new Date(utcStartDateString)
  const periodicDates = []
  for (let i = 0; i < 20; i++) {
    const nextDate = new Date(utcStartDate.getTime())
    nextDate.setUTCDate(utcStartDate.getUTCDate() + i * n)
    periodicDates.push(nextDate.toISOString())
  }
  return periodicDates
}

/**
 * generate 90 dates
 * 
 * @param {*} utcStartDateString '2024-02-04T00:00:00.000Z' in utcformat
 */
export const generateDatesForDailyCards = (utcStartDateString) => {
  const utcStartDate = new Date(utcStartDateString)
  const dailyDates = []
  for (let i = 0; i < 90; i++) {
    const nextDate = new Date(utcStartDate.getTime())
    nextDate.setUTCDate(utcStartDate.getUTCDate() + i)
    dailyDates.push(nextDate.toISOString())
  }
  return dailyDates
}

  /**
   * Assigns review dates to cards based on the specified scheduling type. This function supports 
   * different types of scheduling: GENERAL, DAILY, ONETIME, and PERIODIC, each utilizing 
   * different sources for determining the review dates. 
   * 
   * GENERAL: Uses a predefined array of dates (`reviewDates`) for scheduling.
   * DAILY: Schedules reviews based on an array of daily dates (`dailyDates`).
   * ONETIME: Schedules a single review on the specified start date (`utcStartDateString`).
   * PERIODIC: Generates and uses a series of dates, starting from the specified start date and
   * repeating at intervals defined by `repeatDuration`.
   * 
   * @param {string} utcStartDateString - The starting date in ISO 8601 string format, used for ONETIME and PERIODIC tasks.
   * @param {string} selection - The type of scheduling to apply ("GENERAL", "DAILY", "ONETIME", "PERIODIC").
   * @param {Object} userCardData - The base data for a user's review card, including user and card identifiers, 
   *                                 and review durations.
   * @param {string[]} reviewDates - An array of review dates in ISO 8601 string format, used for GENERAL tasks.
   * @param {string[]} dailyDates - An array of daily dates in ISO 8601 string format, used for DAILY tasks.
   * @param {number} repeatDuration - The number of days between reviews for PERIODIC tasks.
   * 
   * @returns {Object[]} An array of review card data objects, each augmented with:
   *   - `reviewDate`: The assigned review date in ISO 8601 string format.
   *   - `iteration`: The iteration number of the review, starting from 0.
   *   Each object also inherits all properties from `userCardData`, with `reviewDuration` and 
   *   `lastTimeReviewDuration` initialized to specific values (e.g., a default duration) and 
   *   `isReviewed` set to false.
   * 
   * Notes:
   * - The `utcStartDateString` must be a valid ISO 8601 UTC date string.
   * - The function relies on `generateDatesForPeriodicCards` for generating periodic dates, which 
   *   should also use UTC dates to ensure consistency across time zones.
   * - It's important to handle time zones correctly, especially when converting from UTC to local 
   *   times or vice versa, to avoid unintended shifts in the scheduled dates.
   */
  export const addDateToCardData = (utcStartDateString, selection, userCardData, reviewDates, dailyDates, repeatDuration) => {
    let updatedDataArray = []
    if (selection === "GENERAL") {
      updatedDataArray = reviewDates.map((reviewDate, index) => {
        // Create a new data object for each call with the updated reviewDate
        return {
          ...userCardData, 
          reviewDate: reviewDate,
          iteration: index 
        };
      });
    }
    if (selection === "DAILY") {
      updatedDataArray = dailyDates.map((reviewDate, index) => {
        return {
          ...userCardData, 
          reviewDate: reviewDate,
          iteration: index 
        };
      });
    }
    // NOREVIEW is for backward compatibility
    if (selection === "ONETIME" || selection === "NOREVIEW") {
      updatedDataArray.push({
        ...userCardData,
        reviewDate: utcStartDateString,
        iteration: 0
      })
    }        
    if (selection === "PERIODIC") {
      const periodicDates = generateDatesForPeriodicCards(utcStartDateString, repeatDuration)
      updatedDataArray = periodicDates.map((reviewDate, index) => {
        return {
          ...userCardData,
          reviewDate: reviewDate,
          iteration: index 
        };
      });      
    }
    return updatedDataArray
  }
