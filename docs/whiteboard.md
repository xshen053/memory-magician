> A doc I consider it as a whiteboard to record some random thoughts as a user


# Jan 24

# feature 1 type of task
add a new feature so that user can select if a task is a daily task or just ordinary task

- If user adds a daily task, that task will show up every day.
- If user adds an ordinary task, that task shows up according to ebbinghaus forgetting curve

# 2/1/24

user story:

the user has bunches of card need to review each day, but for a specific problem, let's say coding problem, 
the user feels overwhelmed to review all of them, but if user know there is a limit let's say at most 10 problem,
then user feels motivated again!!

# feature: limited tasks

there are many tasks in the database, we want to get limited tasks,
we want to sort them with the latest create date and return only k of them

# 2/2/24

# feature: AI-aided tasks guidance


# 3/24/24

based on [2/1/24](#2124)

the current issue is that user can easily give up doing one task on that day.

So for review memory, a better way is: instead of hard coded review date of that memory, leave this space to user.

For each memory, user can know the last date it reviews it.

And user can set a threshold, e.g. last review date > 7 days, all these card can be listed

But for a new memory, it's always better to review it 1 day immediately, we leave this space to user. we give user suggestion which one's better to review today.

we only record last review date of each card and let user make decision what memory to review that day

This improvement can solve some existing issues 

- review time of each card is more accurate, every time user review a card, it add an entry instead of hard coded these entries before user review, it's not like a debt, but something has already happened

- user will not feel overwhelmed any more, since there aren't too many cards need to review every day, it's pretty flexiable. User can choose to review it or not.

- save memory in database

- no longer need to fetch lots of data from db, since now db stores what user actually reviewed in the past

- for future date in calendar, can create these data in client side





















