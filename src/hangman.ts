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
  private trials;

  constructor(secretWord, trials) {
    this.secretWord = secretWord;
    this.trials = trials;
  }

  tryTo(trial: string) {
    const hasMultipleCharacters = trial.length > 1;
    if (hasMultipleCharacters) {
      return new MultipleLettersNotAllowedError(this.secretWord, this.trials);
    }

    const containsSymbols = /[^a-zA-Z]+$/.test(trial);
    if (containsSymbols)
      return new SymbolsNotAllowedError(this.secretWord, this.trials);

    return new Game(this.secretWord, this.trials);
  }

  availableTrials() {
    return this.trials;
  }

  error() {
    return GameError.None;
  }
}
