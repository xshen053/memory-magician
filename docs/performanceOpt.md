# Problem 1: Fetch data everytime

Everytime navigate to a screen interacting with backend api,
we need to make an api call to fetch data from backend which is time consuming.

There are 2 ways so far I come up with to solve the problem

- reduce duration of 1 api call
- reduce times to make the api call

# opt2:

`getAllCardsNeedReviewOfAUserForToday`

- in today's review

change the limit to 5000

so that only make one api call instead of lots of api call

time: 2s -> 0.2s


# opt3

`getAllUserCardsOfUser`

different method:

1. fetch data directly: fetch 5000 data, takes 3 seconds
2. use mutli-threads, each fetch fetch one month, takes 1.5 second


# opt4

`getCardsInfoFromUserApi`

- search

1. add batchsize
2. add filter only get the card that iteration is 0
