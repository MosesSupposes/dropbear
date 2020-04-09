const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  let tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    let character = input[cursor];

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while (isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({
        type: 'Number',
        value: parseInt(number),
      });

      continue;
    }

    if (isLetter(character)) {
      let fullWord = character;

      while (isLetter(input[++cursor])) {
        fullWord += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: fullWord,
      });

      continue;
    }

    if (isQuote(character)) {
      let string = '';

      while (!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: 'String',
        value: string,
      });

      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid.`);
  }

  return tokens;
};

module.exports = { tokenize };
