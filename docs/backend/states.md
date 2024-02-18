# search screen

state:
- searchResults - the one we always display
- allCardsOfUser - the one we get data only when the page rendering

what we display:
- searchResults

init:

- searchResults: []
- allCardsOfUser: []

useEffect:

- searchResults: all cards
- allCardsOfUser: all cards

input:

- searchResults: filtering results real-time based on searchResults
- allCardsOfUser: all cards

filter after input
- filter by searchTerm
- filter by filter
- remember the state
```js
  const handleTypeChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    const resultAfterSearch = search(searchTerm, allCardsOfUser)
    const resultAfterFilterAndSearch = filt(selectedItems, resultAfterSearch)
    setSearchResults(resultAfterFilterAndSearch)
  };
```


input after search:
```js
  const handleSearchChange = (value) => {
    setSearchTerm(value); // sync
    const resultAfterFilter = filt(selectedItems, allCardsOfUser)
    const resultAfterSearchAndFilter = search(value, resultAfterFilter); // Assuming search now returns the results
    setSearchResults(resultAfterSearchAndFilter);
  };

```

has search:
- searchResults: filter directly
- allCardsOfUser: all cards


delete:

method 1:
- fetch again

method 2 (current used):
- update searchResults set that card's field to deleted
- update allCardsOfUser to remove that card too
- benefit: save a long api call


## tags and newTag

same as add memory

when we click the card, it set tags to current tag this card has
and when we input a new tag and add it, it set this newTag to tags

and when we submit, we update tags of this card


# Global states


## today's review

- today's review entry

## calendar

- all reviews entries

## search

- all cards
