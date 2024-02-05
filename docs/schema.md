

# user table
- A user has 0 - many cards



# card table
- A card has 1 - many date
- A card belongs to one user
- A card has 0 - many tags
- A card has type


# date table
- A date belongs to 0 - many card


# tag table


- A tag belongs to 0 - many card



it might be necessary in the future to query a user from a task, so use both
`@hasMany` and `@belongsto`

