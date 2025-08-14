import TeamSelector from "../../components/TeamSelector";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
    <h1 className="text-2xl font-bold mb-6">Transfer News Tracker</h1>
    <TeamSelector />
  </main>
  );
}
