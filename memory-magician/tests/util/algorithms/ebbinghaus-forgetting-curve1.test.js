import { generateAllReviewDates, generateDatesForPeriodicCards, generateDatesForDailyCards, addDateToCardData } from '../../../src/utilities/algorithm/ebbinghaus-forgetting-curve1.js';


const TESTNUMBER = 0
const ISREVIEWED = false

describe('generateAllReviewDates', () => {
  it('generates review dates using default intervals', () => {
    const utcStartDateString = '2024-02-04T00:00:00.000Z';
    const expectedDates = [
      '2024-02-04T00:00:00.000Z',
      '2024-02-05T00:00:00.000Z',
      "2024-02-09T00:00:00.000Z",
      "2024-02-14T00:00:00.000Z",
      "2024-02-24T00:00:00.000Z",
      "2024-03-05T00:00:00.000Z",
      "2024-03-19T23:00:00.000Z",
      "2024-04-03T23:00:00.000Z",
      "2024-05-03T23:00:00.000Z",
      "2024-06-02T23:00:00.000Z",
      "2024-07-02T23:00:00.000Z",      
    ];
    const reviewDates = generateAllReviewDates(utcStartDateString);
    expect(reviewDates).toEqual(expectedDates);
  });

  it('handles custom intervals correctly', () => {
    const utcStartDateString = '2024-02-04T00:00:00.000Z';
    const customIntervals = [2, 4];
    const expectedDates = [
      '2024-02-06T00:00:00.000Z', // Date + 2 days
      '2024-02-08T00:00:00.000Z', // Date + 4 days
    ];
    const reviewDates = generateAllReviewDates(utcStartDateString, customIntervals);
    expect(reviewDates).toEqual(expectedDates);
  });

  it('returns an empty array when given an empty array of intervals', () => {
    const utcStartDateString = '2024-02-04T00:00:00.000Z';
    const reviewDates = generateAllReviewDates(utcStartDateString, []);
    expect(reviewDates).toEqual([]);
  });
});


describe('generateDatesForPeriodicCards', () => {
  it('repeat a card 20 times every 10 days', () => {
    const utcStartDateString = '2024-02-04T00:00:00.000Z';
    const expectedDates = [
      '2024-02-04T00:00:00.000Z',
      '2024-02-14T00:00:00.000Z',
      "2024-02-24T00:00:00.000Z",
      "2024-03-05T00:00:00.000Z",
      "2024-03-15T00:00:00.000Z",
      "2024-03-25T00:00:00.000Z",
      "2024-04-04T00:00:00.000Z",
      "2024-04-14T00:00:00.000Z",
      "2024-04-24T00:00:00.000Z",
      "2024-05-04T00:00:00.000Z",
      "2024-05-14T00:00:00.000Z",
      "2024-05-24T00:00:00.000Z",
      "2024-06-03T00:00:00.000Z",
      "2024-06-13T00:00:00.000Z",
      "2024-06-23T00:00:00.000Z",
      "2024-07-03T00:00:00.000Z",
      "2024-07-13T00:00:00.000Z",
      "2024-07-23T00:00:00.000Z",
      "2024-08-02T00:00:00.000Z",
      "2024-08-12T00:00:00.000Z",   
    ];
    const everyNdays = 10;
    const reviewDates = generateDatesForPeriodicCards(utcStartDateString, everyNdays);
    expect(reviewDates).toEqual(expectedDates);
    expect(reviewDates.length).toEqual(20)
  });
})

describe('generateDatesForDailyCards', () => {
  it('generate 90 dates', () => {
    const utcStartDateString = '2024-02-04T00:00:00.000Z';
    const expectedDates = [
      "2024-02-04T00:00:00.000Z",
      "2024-02-05T00:00:00.000Z",
      "2024-02-06T00:00:00.000Z",
      "2024-02-07T00:00:00.000Z",
      "2024-02-08T00:00:00.000Z",
      "2024-02-09T00:00:00.000Z",
      "2024-02-10T00:00:00.000Z",
      "2024-02-11T00:00:00.000Z",
      "2024-02-12T00:00:00.000Z",
      "2024-02-13T00:00:00.000Z",
      "2024-02-14T00:00:00.000Z",
      "2024-02-15T00:00:00.000Z",
      "2024-02-16T00:00:00.000Z",
      "2024-02-17T00:00:00.000Z",
      "2024-02-18T00:00:00.000Z",
      "2024-02-19T00:00:00.000Z",
      "2024-02-20T00:00:00.000Z",
      "2024-02-21T00:00:00.000Z",
      "2024-02-22T00:00:00.000Z",
      "2024-02-23T00:00:00.000Z",
      "2024-02-24T00:00:00.000Z",
      "2024-02-25T00:00:00.000Z",
      "2024-02-26T00:00:00.000Z",
      "2024-02-27T00:00:00.000Z",
      "2024-02-28T00:00:00.000Z",
      "2024-02-29T00:00:00.000Z",
      "2024-03-01T00:00:00.000Z",
      "2024-03-02T00:00:00.000Z",
      "2024-03-03T00:00:00.000Z",
      "2024-03-04T00:00:00.000Z",
      "2024-03-05T00:00:00.000Z",
      "2024-03-06T00:00:00.000Z",
      "2024-03-07T00:00:00.000Z",
      "2024-03-08T00:00:00.000Z",
      "2024-03-09T00:00:00.000Z",
      "2024-03-10T00:00:00.000Z",
      "2024-03-11T00:00:00.000Z",
      "2024-03-12T00:00:00.000Z",
      "2024-03-13T00:00:00.000Z",
      "2024-03-14T00:00:00.000Z",
      "2024-03-15T00:00:00.000Z",
      "2024-03-16T00:00:00.000Z",
      "2024-03-17T00:00:00.000Z",
      "2024-03-18T00:00:00.000Z",
      "2024-03-19T00:00:00.000Z",
      "2024-03-20T00:00:00.000Z",
      "2024-03-21T00:00:00.000Z",
      "2024-03-22T00:00:00.000Z",
      "2024-03-23T00:00:00.000Z",
      "2024-03-24T00:00:00.000Z",
      "2024-03-25T00:00:00.000Z",
      "2024-03-26T00:00:00.000Z",
      "2024-03-27T00:00:00.000Z",
      "2024-03-28T00:00:00.000Z",
      "2024-03-29T00:00:00.000Z",
      "2024-03-30T00:00:00.000Z",
      "2024-03-31T00:00:00.000Z",
      "2024-04-01T00:00:00.000Z",
      "2024-04-02T00:00:00.000Z",
      "2024-04-03T00:00:00.000Z",
      "2024-04-04T00:00:00.000Z",
      "2024-04-05T00:00:00.000Z",
      "2024-04-06T00:00:00.000Z",
      "2024-04-07T00:00:00.000Z",
      "2024-04-08T00:00:00.000Z",
      "2024-04-09T00:00:00.000Z",
      "2024-04-10T00:00:00.000Z",
      "2024-04-11T00:00:00.000Z",
      "2024-04-12T00:00:00.000Z",
      "2024-04-13T00:00:00.000Z",
      "2024-04-14T00:00:00.000Z",
      "2024-04-15T00:00:00.000Z",
      "2024-04-16T00:00:00.000Z",
      "2024-04-17T00:00:00.000Z",
      "2024-04-18T00:00:00.000Z",
      "2024-04-19T00:00:00.000Z",
      "2024-04-20T00:00:00.000Z",
      "2024-04-21T00:00:00.000Z",
      "2024-04-22T00:00:00.000Z",
      "2024-04-23T00:00:00.000Z",
      "2024-04-24T00:00:00.000Z",
      "2024-04-25T00:00:00.000Z",
      "2024-04-26T00:00:00.000Z",
      "2024-04-27T00:00:00.000Z",
      "2024-04-28T00:00:00.000Z",
      "2024-04-29T00:00:00.000Z",
      "2024-04-30T00:00:00.000Z",
      "2024-05-01T00:00:00.000Z",
      "2024-05-02T00:00:00.000Z",
      "2024-05-03T00:00:00.000Z", 
    ];
    const reviewDates = generateDatesForDailyCards(utcStartDateString);
    expect(reviewDates).toEqual(expectedDates);
    expect(reviewDates.length).toEqual(90)
  });
})


describe('addDateToCardData', () => {
  const utcStartDateString = '2024-02-04T00:00:00.000Z';

  const userCardData = {
    userID: "userID",
    cardID: "cardID",
    reviewDuration: TESTNUMBER,
    lastTimeReviewDuration: TESTNUMBER,
    isReviewed: ISREVIEWED
  }

  const reviewDates = [
    "2024-02-10T00:00:00.000Z",
    "2024-02-15T00:00:00.000Z",
    "2024-02-20T00:00:00.000Z",
  ]
  
  const dailyDates = [
    "2024-02-04T00:00:00.000Z",
    "2024-02-05T00:00:00.000Z",
    "2024-02-06T00:00:00.000Z",
  ]

  const repeatDuration = 7

  const periodDates = generateDatesForPeriodicCards(utcStartDateString, repeatDuration)

  it('General tasks', () => {
    const expectedData = reviewDates.map((reviewDate, index) => {
      return {
        ...userCardData, 
        reviewDate: reviewDate,
        iteration: index
      };
    });    
    const actualData = addDateToCardData(utcStartDateString, "GENERAL", userCardData, reviewDates, dailyDates, repeatDuration);
    expect(actualData).toEqual(expectedData);
  });

  it('Periodic tasks', () => {
    // console.log(startDate)
    const expectedData = periodDates.map((reviewDate, index) => {
      return {
        ...userCardData, 
        reviewDate: reviewDate,
        iteration: index
      };
    });
    const actualData = addDateToCardData(utcStartDateString, "PERIODIC", userCardData, reviewDates, dailyDates, repeatDuration);
    expect(actualData).toEqual(expectedData);
  });
  it('Daily tasks', () => {
    const expectedData = dailyDates.map((reviewDate, index) => {
      return {
        ...userCardData, 
        reviewDate: reviewDate,
        iteration: index
      };
    });
    const actualData = addDateToCardData(utcStartDateString, "DAILY", userCardData, reviewDates, dailyDates);
    expect(actualData).toEqual(expectedData);
  });
  it('One-time tasks', () => {
    const expectedData = [{
      ...userCardData,
      reviewDate: utcStartDateString,
      iteration: 0
    }]
    const actualData = addDateToCardData(utcStartDateString, "ONETIME", userCardData, reviewDates, dailyDates);
    expect(actualData).toEqual(expectedData);
  });

})
