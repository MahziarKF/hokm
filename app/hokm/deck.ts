// TypeScript (works as JS too if you remove types)

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Card = {
  suit: Suit;
  rank: Rank;
};

export class Deck {
  private cards: Card[] = [];
  private drawn: Card[] = [];

  constructor() {
    this.reset();
  }

  /** Create a new ordered 52-card deck */
  private generateDeck(): Card[] {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
    const ranks: Rank[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    const deck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank });
      }
    }
    return deck;
  }

  /** Shuffle deck using Fisher–Yates algorithm */
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /** Draw a specific number of cards from the top */
  draw(amount: number = 1): Card[] {
    if (amount > this.cards.length) {
      throw new Error("Not enough cards left in the deck!");
    }

    const drawnCards = this.cards.splice(0, amount);
    this.drawn.push(...drawnCards);
    return drawnCards;
  }

  /** Look at the top card without removing it */
  peek(): Card | undefined {
    return this.cards[0];
  }

  /** Reset the deck to full 52 cards */
  reset(): void {
    this.cards = this.generateDeck();
    this.drawn = [];
    this.shuffle();
  }

  /** Get how many cards remain */
  remaining(): number {
    return this.cards.length;
  }

  /** Get how many cards have been drawn */
  drawnCount(): number {
    return this.drawn.length;
  }

  /** Get all drawn cards */
  getDrawnCards(): Card[] {
    return [...this.drawn];
  }
}
