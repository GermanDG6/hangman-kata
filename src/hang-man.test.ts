import { Hangman, HangmanError } from './hang-man';
describe('The Hangman ', () => {
  it('should receive a secret word that contains only letters', () => {
    const secretWord = 'house!';
    const tries = 3;

    const game = Hangman.startGame(secretWord, tries);

    expect(game).toBe(HangmanError.InvalidSecretWord);
  });
});
