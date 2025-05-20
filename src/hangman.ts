export class Hangman {
  static startGame(secretWord: string, tries: number) {
    const hasInvalidCharacters = /[^a-zA-Z]+$/.test(secretWord);

    if (hasInvalidCharacters) return HangmanError.InvalidSecretWord;
  }
}

export enum HangmanError {
  InvalidSecretWord,
}
