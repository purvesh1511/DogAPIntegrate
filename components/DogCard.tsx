import Link from "next/link";
import { DogBreed } from "@/services/dog.service";

type DogCardProps = {
  breed: DogBreed;
};

export default function DogCard({ breed }: DogCardProps) {
  const { name, description, life, male_weight, female_weight, image_url } =
    breed.attributes;

  return (
    <div className="group max-w-sm rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/breeds/${breed.id}`}>
        {/* Header */}
        <div className="rounded-t-xl bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-5 flex items-center gap-3">
          {image_url && (
            <img
              src={image_url}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <h2 className="text-lg font-bold text-white">{name}</h2>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="mb-4 text-sm text-zinc-600 line-clamp-3">
            {description || "No description available."}
          </p>

          <div className="space-y-2 text-sm">
            {life?.min != null && life?.max != null && (
              <div className="flex justify-between rounded-md bg-zinc-50 px-3 py-2">
                <span className="font-medium text-zinc-700">Life span</span>
                <span className="text-zinc-600">
                  {life.min} – {life.max} yrs
                </span>
              </div>
            )}

            {male_weight?.min != null && male_weight?.max != null && (
              <div className="flex justify-between rounded-md bg-zinc-50 px-3 py-2">
                <span className="font-medium text-zinc-700">Male weight</span>
                <span className="text-zinc-600">
                  {male_weight.min} – {male_weight.max} kg
                </span>
              </div>
            )}

            {female_weight?.min != null && female_weight?.max != null && (
              <div className="flex justify-between rounded-md bg-zinc-50 px-3 py-2">
                <span className="font-medium text-zinc-700">Female weight</span>
                <span className="text-zinc-600">
                  {female_weight.min} – {female_weight.max} kg
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
