const data = {
    "playerA": [
        "QS",
        "4C",
        "JC"
    ],
    "playerAWins": false,
    "playerB": [
        "KS",
        "JH"
    ]
}
/** This function takes the suite a belongs to and returns a value to show
 *  which card is most import. This is to fulfil the condition S>H>C>D
 *
 * @param input
 * @returns {number}
 */
function multiple  (input) {
    switch (input) {
        case 'S':
            return 4
        case 'H':
            return 3
        case 'C':
            return 2
        default :
            return 1
    }
}

/**
 * This function returns the value of the card number.
 * 2-9 are each worth the value on the card number
 * K, Q, J and 10 are each worth 10 points
 * A is worth 11 points
 * @param input
 * @returns {number}
 */
 function cardNumberValue ( input) {
     //first check if the card is either of the values below and return
    // either 10 or 11 depending on the fulfilled condition.
    //This also helps filter out string values that cannot be parsed to numbers.
    if (input === "10" || input === "J" || input === "Q" || input === "K") {
        return 10
    }
    if (input === "A") {
        return 11
    }
    //convert the remaining string input into a number. This means each card
    // holds a value of the card number
    return Number.parseInt(input)
}

/**
 * This function tries to obtain the raw points of each holder. The raw
 * points are purely based on the value of the card number. This helps
 * determine if a player has more than 21 points or less, which is the 1st
 * step in eliminating a player or also determine who of the two has higher
 * points that are less than 21.
 * @param cards
 * @returns {number}
 */
function playerRawPoints (cards)  {
    // const cards = data.playerA

    let points = 0//holds the points for the given set of cards
    cards.map(card => {
        //For each card, extract the suite from the string and only retain
        // the card number, e.g if five AS, return A as the card number
        const cardNumber = card.substring(0, card.length - 1)
        //tally the points by obtaining the value of each card number
        points += cardNumberValue(cardNumber)
    })
    //return the total points
    return points
}