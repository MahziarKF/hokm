import DescLanding from "./hokm/components/landing/DescLanding";
import HandLanding from "./hokm/components/landing/handLanding";
import { Deck } from "./hokm/deck";

export default async function Home() {
  // Assuming 'Deck' is a valid class for handling card logic
  const deck = new Deck();
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-950 to-gray-700 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-16 lg:px-20 py-8 gap-10">
      {/* Passing a hand of 5 cards to HandLanding */}
      <HandLanding cards={deck.draw(5)} />
      <DescLanding />
    </div>
  );
}
