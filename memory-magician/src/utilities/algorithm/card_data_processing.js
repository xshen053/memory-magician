/**
 * count number of cards for each tag
 * 
 * 
 * 
 * @param {Array[object]} cards all cards of this user (not deleted)
 * @returns {Object} if cards are not empty or not null
 * - otherwise, return {}
 */
export const getNumOfCardsEachTag = (cards) => {
  if (cards === null || cards.length === 0) {
    return {}
  }

  const tagDict = {}
  // if tags not in tagDict
  // - add tag
  // - 0
  // else
  // ++ 1  
  cards.forEach((card) => {
    const tags = card.tags
    tags.forEach((tag) => {
      if (!tagDict.hasOwnProperty(tag)) {
        tagDict[tag] = 0
      }
      tagDict[tag] += 1
    })
  })
    return tagDict
}

