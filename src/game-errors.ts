import { Game } from './hangman';

export class InvalidSecretWordError extends Game {
  override error() {
    return GameError.InvalidSecretWord;
  }
}

export class TrialsMustBeAtLeastOneError extends Game {
  override error() {
    return GameError.TrialsMustBeAtLeastOne;
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
  TrialsMustBeAtLeastOne,
  MultipleLettersNotAllowed,
  SymbolsNotAllowed,
}
