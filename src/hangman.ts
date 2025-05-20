export class Hangman {
  static startGame(secretWord: string, tries: number) {
    const hasInvalidCharacters = /[^a-zA-Z]+$/.test(secretWord);

    if (hasInvalidCharacters) return HangmanError.InvalidSecretWord;

    const hasNegativeOrZeroTries = tries <= 0;

    if (hasNegativeOrZeroTries) return HangmanError.TriesMustBeAtLeastOne;
  }
}

export enum HangmanError {
  InvalidSecretWord,
  TriesMustBeAtLeastOne,
}
