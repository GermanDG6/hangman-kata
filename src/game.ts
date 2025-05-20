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

    const isAFailTrial = !this.secretWord.match(trial);
    if (isAFailTrial) this.lives--;

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

export class InvalidSecretWordError extends Game {
  override error() {
    return GameError.InvalidSecretWord;
  }
}

export class TrialsMustBeAtLeastOneError extends Game {
  override error() {
    return GameError.LivesMustBeAtLeastOne;
  }
}

export class MultipleLettersNotAllowedError extends Game {
  override error() {
    return GameError.MultipleLettersNotAllowed;
  }
}

export class SymbolsNotAllowedError extends Game {
  override error() {
    return GameError.SymbolsNotAllowed;
  }
}

export enum GameError {
  None,
  InvalidSecretWord,
  LivesMustBeAtLeastOne,
  MultipleLettersNotAllowed,
  SymbolsNotAllowed,
}
