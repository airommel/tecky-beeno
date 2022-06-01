const cards = [
  ['Spade', 'A'],
  ['Diamond', 'J'], // 1
  ['Club', '3'],
  ['Heart', '6'],
  ['Spade', 'K'],
  ['Club', '2'],
  ['Heart', 'Q'], // 1
  ['Spade', '6'],
  ['Heart', 'J'], // 1
  ['Spade', '10'],
  ['Club', '4'],
  ['Diamond', 'Q'], // 1
  ['Diamond', '3'],
  ['Heart', '4'],
  ['Club', '7'],
]

function compareCard(cardA, cardB) {
  const ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ]
  const suits = ['Diamond', 'Club', 'Heart', 'Spade']
  const [suitA, rankA] = cardA
  const [suitB, rankB] = cardB
  const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB)
  if (ranksDiff !== 0) {
    return ranksDiff
  } else {
    return suits.indexOf(suitA) - suits.indexOf(suitB)
  }
}

console.log('Count the number of card which is of suit Spade')
console.log(cards.filter(card => card[0] == 'Spade').length)
console.log(
  cards.map(card => (card[0] == 'Spade' ? 1 : 0)).reduce((acc, c) => acc + c),
)
console.log(
  cards.reduce((count, card) => (card[0] == 'Spade' ? count + 1 : count), 0),
)

console.log()
console.log("Remove all the card that is smaller than ['Club','3']")
console.log(cards.filter(card => compareCard(card, ['Club', '3']) >= 0))

console.log()
console.log(
  'Count the number of card which is of suit Diamond or Heart and with the rank larger than or equal to J',
)
console.log(
  cards.reduce(
    (count, [suit, rank]) =>
      (suit == 'Diamond' || suit == 'Heart') && rank >= 'J' ? count + 1 : count,
    0,
  ),
)

console.log()
console.log(
  'Replace all of the cards with suit Club to suit Diamond, keeping the same rank',
)
console.log(
  cards.map(([suit, rank]) =>
    suit == 'Club' ? ['Diamond', rank] : [suit, rank],
  ),
)

console.log()
console.log(
  'Replace all of the cards with rank A to rank 2. Keeping the same suit',
)
console.log(
  cards.map(([suit, rank]) => (rank == 'A' ? [suit, '2'] : [suit, rank])),
)
