
/**
 * Generates all review dates based on the provided start date and intervals.
 * @param {string} reviewDate - The starting date in ISO string format for generating review dates.
 * e.g. 2024-02-04T22:15:52.019Z
 * @param {number[]} [intervals=[0, 1, 5, 10, 20, 30, 45, 60, 90, 120, 150]] 
 *  - An array of intervals (in days) for review dates. If not provided, defaults to a predefined set of intervals.
 * @returns {string[]} An array of review dates in ISO string format.
 */
export const generateAllReviewDates = (reviewDate, intervals = [0, 1, 5, 10, 20, 30, 45, 60, 90, 120, 150]) => {
  return intervals.map(interval => {
    let date = new Date(reviewDate); // Create a new Date object for each interval
    date.setDate(date.getDate() + interval); // Add the interval to the new date
    return date.toISOString(); // Convert to ISO string format
  });
}

