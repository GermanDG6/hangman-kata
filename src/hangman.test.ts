import { Hangman, HangmanError } from './hangman';
describe('The Hangman ', () => {
  it('should receive a secret word that contains only letters', () => {
    const secretWord = 'house!';
    const tries = 3;

    const game = Hangman.startGame(secretWord, tries);

    expect(game).toBe(HangmanError.InvalidSecretWord);
  });

  it('should receive a positive number of tries', () => {
    const secretWord = 'house';
    const tries = -3;

    const game = Hangman.startGame(secretWord, tries);

    expect(game).toBe(HangmanError.TriesMustBeAtLeastOne);
  });
});
