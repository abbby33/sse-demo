
import SSEClient from "../components/SSEClient";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">🌐 SSE Demo</h1>
      <SSEClient />
    </main>
  );
}
