> A doc about all user requirments

# User stories

# new user

- [ ] add cards to welcome
- [ ] Hi there!
- [ ] Thank you for registering!
- [ ] check a card to finish it
- [ ] your cards can be removed in search bar


## authentication
- [ ] user log in using phone number
- [ ] log in using social account
- [ ] change token expiration time

## All the screens
- [x] As a user, I want to create new memories. (all the screens)
- [x] When creating memory, I want to give them tags, e.g. leetcode 3, it is {blind 75, amazon, strings}
- [x] Add a component to show a user's information, like hello xxx

## Memory screen
- [ ] First put reviewed times 0 - 2 to the front
- [ ] sort all memories based on last review date, review it earlier, put it 
- [x] show last review date 
- [x] reviewed times: (update based on UserCard)
- [ ] every time mark reviewed, create a review time, update card's last review, total field
- [ ] add links


## Today's highlight screen
- [x] show all type of work you done today




## Today's review screen
- [x] As a user, I want to know what memories I want to review today. (today's review screen)
- [x] As a user, I want to remove a card (mark as reviewed) when I finish reviewing that card (today's review screen)
- [x] As a user, I am able to create different types of card, e.g. (daily card(need to do every day), general task), and 
different types of card have different background so it's clear.
- [x] For each card, I want to see how many times I reviewed it, e.g. 3rd, or 3/18
- [x] Add tag for a task
- [x] for each card, I am about to start counting and stop counting the time and once I finished and clicked reviewed, that time is stored
- [x] if I don't start the timer, it means it can be finished in 1s
- [x] add different background color of different type of cards
- [x] for card I reviewed, make them doesn't appear, just cann't be selected
- [x] some card I added no need review, but just some usual task, I want to see them too
- [ ] for cards, I want to receive reminder like email or phone
- [x] I suddenly have a flash idea, I want to write it down, and check later (flash of inspiration)
- [x] I want to add a card (periodically showup, every 3 weeks..., now set half year)
- [x] for card I checked, instead of showing the timer, show the time I spent on it
- [x] filter card to display, e.g., only want to see general card
- [x] reduce the time to send data, batch
- [ ] mark review, update total and last review date in card



  

### reminder functionaility

- [x] I want to set other task that need to review perioridcally


### No urgent
- [ ] As a user, if I accidentally review a memory, I can withdraw (no urgent)
  - maybe count, if more than 5 seconds, then disappear
  - undo!

## Home screen (Data visualization screen)
- [ ] As a user, I want to know review data of each memory, e.g., memory 1 reviewed 5/8, review rate 62.5%
- [ ] I want to see how long I spent today on all the tasks
- [ ] I want to have a pie chart to know number of each type of card


### metrics

- review rate: actually review count / all cards need to review by far
- different tags: task number


## Calendar screen
- [x] As a user, I want to have a calendar to know what I need to review everyday (calendar screen)
- [x] As a user, I want to see all tasks on the calendar, but use strikethrough for task I reviewed
- [ ] for passed tasks, change background color to some obvious color
- [ ] for today, the background becomes more obvious
- [x] add a filter for each type of cards
- [ ] also color should be the same

## Catch up screen
- [ ] As a user, for all the tasks I missed, I want to catch up them
- [ ] I catched up tasks til now, if I missed again in the future, I should still be able to catch it up
- [ ] 

## Search Screen
- [x] Also search a task I created
- [x] I want to update, change, search a task
- [x] delete
- [ ] advanced filter based on card type
- [ ] integrate context api in this screen too
- [ ] add create date for each card

## No urgent
- [ ] As a user I want to change my review time cycle, like not from 00 to 00
but from 10 - 10
- [ ] As a user, I am able to reset curve of a specific memory 
- [ ] As a user, I want to know how long I spent on each card, default is 0
- [ ] The user has bunches of card need to review each day, but for a specific problem, let's say coding problem, the user feels overwhelmed to review all of them, but if user know there is a limit let's say at most 10 problem, then user feels motivated again!! User wants to see estimate time / number of task they will review for a day.

  - But I feel the reason is because they are worried they cannot catch up again in the future, but once they know they have a catch-up screen to review these tasks, it's not a problem.



### AI Part
