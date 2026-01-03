import { fetchDogById, fetchDogFacts } from "@/services/dog.service";
import type { DogBreed, DogFact } from "@/services/dog.service";

export default async function DogDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    console.log("Dog ID:", id);

    let breed: DogBreed | null = null;
    let facts: DogFact[] = [];

    try {
        breed = await fetchDogById(id);
        facts = await fetchDogFacts();
    } catch (error) {
        console.error("Failed to fetch dog:", error);
    }

    if (!breed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
                <p className="text-red-500 text-lg">Breed not found!</p>
            </div>
        );
    }

    const {
        name,
        description,
        life,
        male_weight,
        female_weight,
        image_url,
    } = breed.attributes;

    return (
        <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-900">
            {/* Header */}
            <div className="mx-auto mb-12 max-w-7xl rounded-2xl bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-8 shadow-lg">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                            Public API
                        </span>

                        <h1 className="mt-2 max-w-xl text-4xl font-extrabold text-white">
                            Dog API – Dog Breeds Directory
                        </h1>

                        <p className="mt-4 max-w-xl text-white/80">
                            Discover detailed information about dog breeds including life span,
                            temperament, and breed characteristics.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex gap-6">
                {/* Breed Details */}
                <div className="w-2/3">
                    <div className="rounded-xl bg-white shadow-md dark:bg-zinc-800 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-6 flex items-center gap-4">
                            {image_url && (
                                <img
                                    src={image_url}
                                    alt={name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                            )}
                            <h1 className="text-2xl font-bold text-white">{name}</h1>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-zinc-700 dark:text-zinc-200">
                                {description || "No description available."}
                            </p>

                            {life?.min && life?.max && (
                                <InfoRow label="Life span" value={`${life.min} – ${life.max} yrs`} />
                            )}

                            {male_weight?.min && male_weight?.max && (
                                <InfoRow
                                    label="Male weight"
                                    value={`${male_weight.min} – ${male_weight.max} kg`}
                                />
                            )}

                            {female_weight?.min && female_weight?.max && (
                                <InfoRow
                                    label="Female weight"
                                    value={`${female_weight.min} – ${female_weight.max} kg`}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Dog Facts */}
                <div className="w-1/3 rounded-xl bg-white shadow-md dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#7a283a] to-[#4a1524] p-6 flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">Dog Facts</h1>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-3">
                            {facts.length > 0 ? (
                                facts.map((fact) => (
                                    <div
                                        key={fact.id}
                                        className="rounded-md bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
                                    >
                                        {fact.attributes?.body}
                                    </div>
                                ))
                            ) : (
                                <p className="text-zinc-500">No facts available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Reusable row */
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between rounded-md bg-zinc-50 px-4 py-2 dark:bg-zinc-700">
            <span className="font-medium">{label}</span>
            <span className="text-zinc-600 dark:text-zinc-300">{value}</span>
        </div>
    );
}
