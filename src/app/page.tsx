
import  { FlipCard }  from "@/components/FlipCard";
const players = [
  "/assets/images/ronaldo.jpg",
  "/assets/images/ronaldo.svg",
  "/assets/images/neymar.svg",
];
export default function Home() {
  return (
    <div className="font-sans flex flex-row items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-black">
      {players.map((player, index) => (
        <FlipCard key={index} size={(index + 1) as 1 | 2 | 3} imageSrc={player} />
      ))}
      
    </div>
  );
}
