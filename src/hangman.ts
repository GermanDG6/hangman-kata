import {
  GameError,
  InvalidSecretWordError,
  MultipleLettersNotAllowedError,
  SymbolsNotAllowedError,
  TrialsMustBeAtLeastOneError,
} from './game-errors';

export class Hangman {
  static startGame(secretWord: string, tries: number) {
    const hasInvalidCharacters = /[^a-zA-Z]+$/.test(secretWord);

    if (hasInvalidCharacters)
      return new InvalidSecretWordError(secretWord, tries);

    const hasNegativeOrZeroTries = tries <= 0;

    if (hasNegativeOrZeroTries)
      return new TrialsMustBeAtLeastOneError(secretWord, tries);

    return new Game(secretWord, tries);
  }
}

export class Game {
  private readonly secretWord;
  private tries;

  constructor(secretWord, tries) {
    this.secretWord = secretWord;
    this.tries;
  }

  tryTo(trial: string) {
    if (trial.length > 1) {
      return new MultipleLettersNotAllowedError(this.secretWord, this.tries);
    }

    if (/[^a-zA-Z]+$/.test(trial))
      return new SymbolsNotAllowedError(this.secretWord, this.tries);

    return new Game(this.secretWord, this.tries);
  }

  error() {
    return GameError.None;
  }
}
