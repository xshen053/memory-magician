
import { generateAllReviewDates } from '../../algorithm/ebbinghaus-forgetting-curve1.js';

const reviewDates = ["1","2","3"]

const baseData = {
  userID: "xx",
  cardID: "xx"
}

const updatedDataArray = reviewDates.map(reviewDate => {
  // Create a new data object for each call with the updated reviewDate
  return { ...baseData, reviewDate: reviewDate };

})

console.log(updatedDataArray)

const date = "2024-02-04T22:15:52.019Z"

const r = generateAllReviewDates(date)
console.log(r)
