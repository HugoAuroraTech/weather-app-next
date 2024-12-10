import Link from "next/link";

export default function Header() {
    return (
        <header className="text-center py-8">
            <h1 className="text-4xl font-bold"><Link href="/">Weather App</Link></h1>
        </header>
    )
}