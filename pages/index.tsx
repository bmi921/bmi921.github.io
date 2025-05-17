import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="flex justify-center text-2xl font-bold ">
      <div className="flex flex-col  w-min p-4">
        <Link className="m-4 border w-min  p-2 rounded" href="/blog">
          Blog
        </Link>
        <Link className="m-4 border w-min   p-2 rounded" href="/cvrp.html">
          CVRP
        </Link>
        <Link className="m-4 border w-min  p-2 rounded" href="/music">
          MUSIC
        </Link>
      </div>
    </main>
  );
}
