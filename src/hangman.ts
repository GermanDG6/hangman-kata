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
  private readonly secretWord: string;
  private lives: number;
  private trials: string[] = [];

  constructor(secretWord, lives) {
    this.secretWord = secretWord;
    this.lives = lives;
  }

  tryTo(trial: string) {
    const hasMultipleCharacters = trial.length > 1;
    if (hasMultipleCharacters) {
      return new MultipleLettersNotAllowedError(this.secretWord, this.lives);
    }

    const containsSymbols = /[^a-zA-Z]+$/.test(trial);
    if (containsSymbols)
      return new SymbolsNotAllowedError(this.secretWord, this.lives);

    this.trials.push(trial);

    if (!this.secretWord.match(trial)) this.lives--;

    return new Game(this.secretWord, this.lives);
  }

  availableLives() {
    return this.lives;
  }

  revealedWord(): any {
    let revealedWord = '';
    for (const letter of this.secretWord) {
      this.trials.includes(letter)
        ? (revealedWord += letter)
        : (revealedWord += '_');
    }
    return revealedWord;
  }

  error() {
    return GameError.None;
  }
}
