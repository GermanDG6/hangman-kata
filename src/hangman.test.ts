import { GameError } from './game-errors';
import { Hangman } from './hangman';

describe('The Hangman ', () => {
  it('should receive a secret word that contains only letters', () => {
    const secretWord = 'house!';
    const trials = 3;

    const game = Hangman.startGame(secretWord, trials);

    expect(game.error()).toBe(GameError.InvalidSecretWord);
  });

  it('should receive a positive number of trials', () => {
    const secretWord = 'house';
    const trials = -3;

    const game = Hangman.startGame(secretWord, trials);

    expect(game.error()).toBe(GameError.TrialsMustBeAtLeastOne);
  });

  it('does not allow multiple letters at each trial', () => {
    const game = Hangman.startGame('house', 4);

    const trial = game.tryTo('ab');

    expect(trial.error()).toBe(GameError.MultipleLettersNotAllowed);
  });
});
