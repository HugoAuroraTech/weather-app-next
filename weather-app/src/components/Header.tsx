import Link from "next/link";

export default function Header() {
  return (
    <header className="text-center py-8 bg-blue-500">
      <h1 className="text-4xl font-black text-white font-mono">
        <Link className="text-white font-bold hover:text-gray-200" href="/">
          Weather App
        </Link>
      </h1>
    </header>
  );
}
