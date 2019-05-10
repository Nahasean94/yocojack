const YocoJack = {


    /**
     * This function determines who the winner is based on their raw points.
     * Only if they tie do we go and use recursion to determine the highest
     * card, etc
     * @param playerA
     * @param playerB
     * @returns {string|*}
     */
    determineWinner: (playerA, playerB, expectedResult) => {
        let isExpectedResult = false
        let playerAWins = false
        const playerAPoints = playerRawPoints(playerA)
        const playerBPoints = playerRawPoints(playerB)


        if (playerAPoints > 21 && playerBPoints > 21) {
            playerAWins = false
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Both lose", isExpectedResult]
        } else if (playerAPoints > 21 && playerBPoints <= 21) {
            playerAWins = false
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player B Wins", isExpectedResult]
        } else if (playerAPoints <= 21 && playerBPoints > 21) {
            playerAWins = true
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player A Wins", isExpectedResult]
        } else if (playerAPoints > playerBPoints) {
            playerAWins = true
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player A Wins", isExpectedResult]
        } else if (playerBPoints > playerAPoints) {
            playerAWins = false
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player B Wins", isExpectedResult]
        } else {
            return determineWinnerRecursively(playerA, playerB, expectedResult)
        }
    },
}

/** This function takes the suite a belongs to and returns a value to show
 *  which card is most import. This is to fulfil the condition S>H>C>D
 *
 * @param input
 * @returns {number}
 */
function multiple(input) {
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
function cardNumberValue(input) {
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
function playerRawPoints(cards) {
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

/**
 * This function sorts the card numbers according to their value.
 * The expected result is A K Q J 10 9 8 7 6 5 4 3 2
 * @param arr
 * @returns {*[]}
 */
function sortCardNumbers(arr) {

    const numbers = []
    //the arrays below hold the various instances of each card number
    // since one could have more than one A or J, etc.
    const aArray = []
    const kArray = []
    const qArray = []
    const jArray = []
    /**
     * Here we sort tha letters to match the order A K Q J.
     */
    arr.map(ar => {
        switch (ar.substring(0, ar.length - 1)) {
            case "A":
                aArray.push(ar)
                break
            case "K":
                kArray.push(ar)
                break
            case "Q":
                qArray.push(ar)
                break
            case "J":
                jArray.push(ar)
                break
            default:
                numbers.push(ar)

        }
    })

//sort the numbers from largest to smallest
    const sortedNumbers = numbers.sort((a, b) => b.substring(0, b.length - 1) - a.substring(0, a.length - 1))
    //combine the various smaller arrays of each card number to form one
    // sorted array
    const sortedLetters = [...aArray, ...kArray, ...qArray, ...jArray]

    return [...sortedLetters, ...sortedNumbers]
}

/**
 * Determine the winner by recursively comparing their cards.
 * The assumption made here is that for the function to execute, only cases
 * of card matches reach this far, e.g ['10S','6H'] and ['10H','6S'].
 * @param playerA
 * @param playerB
 * @param expectedResult
 * @returns {*[]}
 */
function determineWinnerRecursively(playerA, playerB, expectedResult) {
    //Sort the array of cards of each holder
    const sortedA = sortCardNumbers(playerA)
    const sortedB = sortCardNumbers(playerB)
    let isExpectedResult = false
    let playerAWins = false

    let smallerIndex//this is used to help us avoid index out of bound exception
    let index = 0

    if (sortedA.length > sortedB.length) {
        smallerIndex = sortedB.length
    } else {
        smallerIndex = sortedB.length
    }
    /**
     * Loop to compare the values at each index.
     */

    do {
        let aValue = cardValue(sortedA[index])
        let bValue = cardValue(sortedB[index])

        if (aValue > bValue) {
            playerAWins = true
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player A Wins", isExpectedResult]
        } else if (bValue > aValue) {
            playerAWins = false
            if (expectedResult === playerAWins) {
                isExpectedResult = true
            }
            return ["Player B Wins", isExpectedResult]
        }
        index++
        //exit the loop if index is greater equal or greater than the length
        // of the smallest array
    } while (index < smallerIndex)
}

/**
 * Obtain the value of a card. We multiply the value of card suite with
 * value of card number to give precedence to suites in the following order
 * S>H>C>D
 * @param input
 * @returns {number}
 */
function cardValue(input) {

    return multiple(input.charAt(input.length - 1)) * cardNumberValue(input.substring(0, input.length - 1))

}

module.exports = YocoJack