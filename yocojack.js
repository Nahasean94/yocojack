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