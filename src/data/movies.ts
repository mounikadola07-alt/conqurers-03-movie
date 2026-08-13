export interface Movie {
  id: string | number;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  genre: string;
  genres: string[];
  runtime: string;
  director: string;
  cast: string[];
  description: string;
  trailerId: string;
  popularity?: number;
}

export const FALLBACK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    rating: 8.6,
    year: 2024,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "2h 46m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    trailerId: "Way9Dexny3w",
    popularity: 98
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    rating: 8.9,
    year: 2023,
    genre: "Biography",
    genres: ["Biography", "Drama", "History"],
    runtime: "3h 00m",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    trailerId: "uYPbbksJxIg",
    popularity: 95
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    rating: 8.7,
    year: 2014,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft to find a new home.",
    trailerId: "zSWdZVtXT7E",
    popularity: 97
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    rating: 8.8,
    year: 2023,
    genre: "Animation",
    genres: ["Animation", "Action", "Adventure"],
    runtime: "2h 20m",
    director: "Joaquim Dos Santos, Kemp Powers",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    trailerId: "cqGjhVJWtEg",
    popularity: 96
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&auto=format&fit=crop&q=80",
    rating: 9.0,
    year: 2008,
    genre: "Action",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    description: "When the menace known as the Joker wreaks havoc and chaos on Gotham City, Batman must accept one of the greatest psychological tests.",
    trailerId: "EXeTwQWrcwY",
    popularity: 99
  },
  {
    id: 6,
    title: "Cyberpunk: Edgerunners",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    rating: 8.3,
    year: 2022,
    genre: "Animation",
    genres: ["Animation", "Sci-Fi", "Action"],
    runtime: "25m / ep",
    director: "Hiroyuki Imaishi",
    cast: ["KENN", "Aoi Yuuki", "Hiroki Touchi"],
    description: "A street kid trying to survive in a technology and body modification-obsessed city of the future.",
    trailerId: "JtqIas3bYhg",
    popularity: 90
  },
  {
    id: 7,
    title: "Blade Runner 2049",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    rating: 8.0,
    year: 2017,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Mystery", "Drama"],
    runtime: "2h 44m",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
    trailerId: "gCcx85zbxz4",
    popularity: 91
  },
  {
    id: 8,
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    rating: 7.8,
    year: 2022,
    genre: "Action",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 56m",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    trailerId: "mqqft2x_Aa4",
    popularity: 92
  }
];
