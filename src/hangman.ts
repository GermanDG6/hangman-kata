import { Game } from './game';
import {
  InvalidSecretWordError,
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
