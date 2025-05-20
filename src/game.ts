export class Game {
  private readonly secretWord: string;
  private lives: number;
  private trials: string[] = [];

  constructor(secretWord: string, lives: number) {
    this.secretWord = secretWord;
    this.lives = lives;
  }

  tryTo(trial: string): Game {
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

  availableLives(): number {
    return this.lives;
  }

  revealedWord(): string {
    let revealedWord = '';
    for (const letter of this.secretWord) {
      this.trials.includes(letter)
        ? (revealedWord += letter)
        : (revealedWord += '_');
    }
    return revealedWord;
  }

  isOver(): boolean {
    if (this.lives === 0) return true;
    return false;
  }

  gameStatus(): GameStatus {
    const containsUnderscore = /[_]/.test(this.revealedWord());
    if (containsUnderscore) return GameStatus.InProgress;

    if (this.isOver()) return GameStatus.PlayerLosses;

    return GameStatus.PlayerWins;
  }

  error(): GameError {
    return GameError.None;
  }
}

export class InvalidSecretWordError extends Game {
  override error(): GameError {
    return GameError.InvalidSecretWord;
  }
}

export class TrialsMustBeAtLeastOneError extends Game {
  override error(): GameError {
    return GameError.LivesMustBeAtLeastOne;
  }
}

export class MultipleLettersNotAllowedError extends Game {
  override error(): GameError {
    return GameError.MultipleLettersNotAllowed;
  }
}

export class SymbolsNotAllowedError extends Game {
  override error(): GameError {
    return GameError.SymbolsNotAllowed;
  }
}

export enum GameStatus {
  PlayerWins,
  PlayerLosses,
  InProgress,
}

export enum GameError {
  None,
  InvalidSecretWord,
  LivesMustBeAtLeastOne,
  MultipleLettersNotAllowed,
  SymbolsNotAllowed,
}
