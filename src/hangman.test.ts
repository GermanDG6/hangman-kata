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

  it('does not allow symbols at each trial', () => {
    const game = Hangman.startGame('house', 4);

    const attempt = game.tryTo('!');

    expect(attempt.error()).toBe(GameError.SymbolsNotAllowed);
  });

  it('invalid trials do not affect the number of trials', () => {
    const trials = 4;
    const game = Hangman.startGame('house', trials);

    const attempt = game.tryTo('!');

    expect(attempt.availableTrials()).toBe(trials);
  });

  it('should show an underscore for each letter of the secret word', () => {
    const game = Hangman.startGame('red', 3);

    expect(game.revealedWord()).toBe('___');
  });
});
