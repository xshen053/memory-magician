import { getNumOfCardsEachTag } from '../../../src/utilities/algorithm/card_data_processing.js';



describe('getNumOfCardsEachTag', () => {
  it('card with data', () => {
    const cards = [
    {
      id: 'f69e8553-08a7-40e4-8ca5-45982fe2f96f',
      content: 'vvvvv',
      tags: ["blind75", "leetcode", "epi"],
      type: 'GENERAL',
      total: 11,
      createdAt: '2024-02-06T23:27:55.275Z',
      updatedAt: '2024-02-06T23:27:55.275Z',
      __typename: 'Card'
    },
    {
      id: 'f69e8553-08a7-40e4-8ca5-45982fe2f96f',
      content: 'vvvvv',
      tags: ["blind75", "epi"],
      type: 'GENERAL',
      total: 11,
      createdAt: '2024-02-06T23:27:55.275Z',
      updatedAt: '2024-02-06T23:27:55.275Z',
      __typename: 'Card'
    },
    {
      id: 'f69e8553-08a7-40e4-8ca5-45982fe2f96f',
      content: 'vvvvv',
      tags: ["epi"],
      type: 'GENERAL',
      total: 11,
      createdAt: '2024-02-06T23:27:55.275Z',
      updatedAt: '2024-02-06T23:27:55.275Z',
      __typename: 'Card'
    },
    {
      id: 'f69e8553-08a7-40e4-8ca5-45982fe2f96f',
      content: 'vvvvv',
      tags: [],
      type: 'GENERAL',
      total: 11,
      createdAt: '2024-02-06T23:27:55.275Z',
      updatedAt: '2024-02-06T23:27:55.275Z',
      __typename: 'Card'
    },              
    ]
    const expectedDict = {
      "epi": 3,
      "blind75": 2,
      "leetcode": 1,
    }
    const returnDict = getNumOfCardsEachTag(cards);
    expect(returnDict).toEqual(expectedDict);
  });

  it('tags of all cards are empty', () => {
    const cards = [{
    tags: []
    },
    {
    tags: []
    },
    {
    tags: []
    }
  ]
    const expectedDict = {}
    const returnDict = getNumOfCardsEachTag(cards);
    expect(returnDict).toEqual(expectedDict);
  });

  it('cards array is empty', () => {
    const cards = []
    const expectedDict = {}
    const returnDict = getNumOfCardsEachTag(cards);
    expect(returnDict).toEqual(expectedDict);
  });
  
  it('cards array is null', () => {
    const cards = null
    const expectedDict = {}
    const returnDict = getNumOfCardsEachTag(cards);
    expect(returnDict).toEqual(expectedDict);
  })
});
