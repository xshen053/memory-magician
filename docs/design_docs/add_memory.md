# Goal

The goal of this component is to build a button so that user can add different memories to the database.

Also should help user prevent empty input in some boxes

## states:

- title
  - name of the memory user want to add
  - type: string
  - Init: empty
- localStartDate
  - date user wants to review that memory
  - type: date object
  - Init: today's date
- newTag
  - to hold user's tag add input
  - string
  - Init: empty
- tags
  - hold all tags user added so far
  - [string]
  - Init: empty
- selection
  - type of memory user wants to add
  - 4 valus: 
  - string
  - Init: "ONETIME"
- repeatDuration
  - a variable to store how often user want to repeat a memory
  - string
  - Init: empty
- titleError
  - show errors if user forgot to input `title` when trying to add the memory
  - Boolean
  - Init: False
- repeatDayError
  - show errors if user forgot to input `repeatDuration` when trying to add the memory
  - Boolean
  - Init: False
- tagError
  - show errors if user type something in `newTag` but forget to add it to all `tags`
  - Boolean
  - Init: False

## Components:

- memory input box
  - a box for user to input name of memory he wants to add
  - error: will show error if titleError is true
  - init: visible
- date picker
  - user uses this to choose start date of the memory he wants to add
  - once user chooses a date, the date appears
  - init: visible
- tag input box
  - user types in tag he wants to add in this box
  - error: will show error if tagError is true
  - init: visible
- repeat input box
  - hold user input for repeat period
  - error: will show error if repeatError is true
  - will only show up if user chooses Repeat 
  - init: hidden
- add tag button
  - user clicked add tag to add a tag he inputs in tag input box
  - init: visible
- options dropdown
  - user use this dropdown to choose different type of memories
  - Four values: Repeat, One-time, Daily, General
  - init: visible
- add button
  - a button user will click after he finished all the inputs
  - init: visible

# User's behaviour

- user types in memory name
  - what happened?
    - title gets updated
- user chooses start date of memory
  - what happened?
    - localStartDate gets updated
- user adds tag in the tag box
  - what happened?
    - newTag gets updated
- user clicked add Tag to add the tag he just input 
  - what happened?
    - content in newTag is added in tags
    - newTag gets empty
- user chooses the type of the memory
  - what happened?
    - it shows different type based on user's choice
    - when user chooses repeat memory, repeat input box will show up
- user types repeat day
  - what happened?
    - repeatDuration gets updated
- user clicks add button
  - what happened?
    - it will check if boxes are empty
    - if so, it will set corresponding error to True
    -   error messages show up under the box
    - else it will do these things
      - reset error states to false
      - creates a new memory in database
      - creates and associates serveral review dates with this memory based on type in database
      - show a message to let user know success


