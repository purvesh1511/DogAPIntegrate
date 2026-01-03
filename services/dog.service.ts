const API_BASE_URL = "https://dogapi.dog/api/v2";

export type DogBreed = {
  id: string;
  attributes: {
    name: string;
    description?: string | null;
    life?: {
      min?: number;
      max?: number;
    };
    male_weight?: {
      min?: number;
      max?: number;
    };
    female_weight?: {
      min?: number;
      max?: number;
    };
    image_url?: string | null;
  };
};

export type DogFact = {
  id: string;
  attributes: {
    body?: string | null;
  };
};

/**
 * Fetch all dog breeds
 */
export async function fetchDogBreeds(): Promise<DogBreed[]> {
  const response = await fetch(`${API_BASE_URL}/breeds?page[size]=1000`, {
    cache: "no-store", // server component fetch
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog breeds");
  }

  const { data } = await response.json();
  return data;
}

/**
 * Fetch single dog breed by ID
 */
export async function fetchDogById(dogId: string): Promise<DogBreed | null> {
  if (!dogId) return null;

  const response = await fetch(`${API_BASE_URL}/breeds/${dogId}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  const { data } = await response.json();
  return data;
}


export async function fetchDogFacts(): Promise<DogFact | null> {
  const response = await fetch(`${API_BASE_URL}/facts?limit=3`, {
    cache: "no-store", // server component fetch
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog facts");
  }

  const { data } = await response.json();
  return data;
}