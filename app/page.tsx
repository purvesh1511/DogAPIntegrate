"use client";

import { useEffect, useState } from "react";
import { fetchDogBreeds } from "@/services/dog.service";
import DogCard from "@/components/DogCard";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_LOAD = 12;

export default function Home() {
  const [breeds, setBreeds] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogBreeds()
      .then((data) => setBreeds(data))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  if (loading) {
    return (
      <div className="p-8 text-center vertical-center text-zinc-500">
        <Image
          src="/loader.gif"
          alt="Loading..."
          width={500}
          height={300}
          className="mx-auto"
        />
        <p className="mt-4 text-lg">Loading dog breeds...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">

      <div className="mx-auto mb-12 max-w-7xl rounded-2xl bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-8 shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Public API
            </span>

            <h1 className="mt-2 max-w-xl text-4xl font-extrabold leading-tight text-white">
              Dog API – Dog Breeds Directory
            </h1>

            <p className="mt-4 max-w-xl text-white/80">
              Discover detailed information about dog breeds including life span,
              temperament, and breed characteristics powered by the Dog API.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#7a283a] transition hover:bg-zinc-100">
              Explore Breeds
            </button>

            <Link href="https://dogapi.dog/docs/api-v2" target="_blank" className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              API Docs
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breeds.slice(0, visibleCount).map((breed) => (
          <DogCard key={breed.id} breed={breed} />
        ))}
      </div>

      {visibleCount < breeds.length && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            className="rounded-lg bg-[#7a283a] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#5e1f2e]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
