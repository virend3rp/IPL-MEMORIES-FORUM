import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center bg-yellow-300">
      <h1 className="text-4xl font-bold text-gray-800">🏏Welcome to the IPL Memories Forum!</h1>
      <p className="mt-3 text-xl text-gray-600">Discover the memories of each match from a fan's perspective and share your own experiences.</p>
      <div className="mt-6">
        <Link href="/year-wise-matches" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Let the Memories Flow
        </Link>
      </div>
    </div>
  );
}
