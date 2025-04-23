import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import AuthButtons from "@/app/components/AuthButtons";
import TypingBox from "./components/typingBox";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-start py-8 px-2 overflow-x-hidden">
      <div className="w-full max-w-5xl flex items-center justify-between">
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-keyboard-icon lucide-keyboard"><path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
        <h1 className="text-4xl font-bold text-white">Typing Test</h1>
        </span>
        <AuthButtons session={session} />
      </div>

      {session ? (
        <div className="w-full max-w-5xl bg-gray-600 shadow-lg rounded-xl p-6 mt-6 ">
          <TypingBox />
        </div>
      ) : (
        <p className="text-gray-300 text-lg mt-6">Please log in to start the test.</p>
      )}
    </main>
  );
}
