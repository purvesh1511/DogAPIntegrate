import Link from "next/link";
import { DogFact } from "@/services/dog.service";

type DogFactProps = {
  fact: DogFact;
};

export default function DogFactCard({ fact }: DogFactProps) {
  const { body } = fact.attributes;

  return (
    <div className="group max-w-sm rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/breeds/${fact.id}`}>
        {/* Header */}
        <div className="rounded-t-xl bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-5 flex items-center gap-3">
          <h2 className="text-lg font-bold text-white">{body}</h2>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="mb-4 text-sm text-zinc-600 line-clamp-3">
            {"No description available."}
          </p>
        </div>
      </Link>
    </div>
  );
}