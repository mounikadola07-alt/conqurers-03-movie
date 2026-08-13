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
  tagline?: string;
}

export const FALLBACK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    rating: 8.6,
    year: 2024,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "2h 46m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Florence Pugh"],
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    trailerId: "Way9Dexny3w",
    popularity: 98
  },
  {
    id: 2,
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    rating: 8.9,
    year: 2023,
    genre: "Biography",
    genres: ["Biography", "Drama", "History"],
    runtime: "3h 00m",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II and the political fallout he faced in the years following.",
    trailerId: "uYPbbksJxIg",
    popularity: 96
  },
  {
    id: 3,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    rating: 8.7,
    year: 2014,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    description: "When Earth becomes uninhabitable, a team of ex-NASA astronauts travels through a wormhole near Saturn in search of a new habitable planet for humanity.",
    trailerId: "zSWdZVtXT7E",
    popularity: 97
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "With great power comes great responsibility.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    rating: 8.8,
    year: 2023,
    genre: "Animation",
    genres: ["Animation", "Action", "Adventure"],
    runtime: "2h 20m",
    director: "Joaquim Dos Santos, Kemp Powers",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Jake Johnson"],
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    trailerId: "cqGjhVJWtEg",
    popularity: 95
  },
  {
    id: 5,
    title: "The Dark Knight",
    tagline: "Welcome to a world without rules.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&auto=format&fit=crop&q=80",
    rating: 9.0,
    year: 2008,
    genre: "Action",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"],
    description: "When the sadistic criminal mastermind known as the Joker emerges, Batman must undergo his greatest physical and psychological trial to save Gotham.",
    trailerId: "EXeTwQWrcwY",
    popularity: 99
  },
  {
    id: 6,
    title: "Blade Runner 2049",
    tagline: "The key to the future is finally unearthed.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    rating: 8.0,
    year: 2017,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Mystery", "Drama"],
    runtime: "2h 44m",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
    description: "Officer K, a new blade runner, uncovers a long-buried secret that has the potential to plunge society into chaos.",
    trailerId: "gCcx85zbxz4",
    popularity: 92
  },
  {
    id: 7,
    title: "The Batman",
    tagline: "Unmask the truth.",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    rating: 7.8,
    year: 2022,
    genre: "Action",
    genres: ["Action", "Crime", "Drama"],
    runtime: "2h 56m",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Colin Farrell"],
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    trailerId: "mqqft2x_Aa4",
    popularity: 91
  },
  {
    id: 8,
    title: "Cyberpunk: Edgerunners",
    tagline: "Night City will take everything from you.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    rating: 8.3,
    year: 2022,
    genre: "Animation",
    genres: ["Animation", "Sci-Fi", "Action"],
    runtime: "25m / ep",
    director: "Hiroyuki Imaishi",
    cast: ["KENN", "Aoi Yuuki", "Hiroki Touchi"],
    description: "A street kid trying to survive in Night City, a technology and body modification-obsessed metropolis.",
    trailerId: "JtqIas3bYhg",
    popularity: 89
  },
  {
    id: 9,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&auto=format&fit=crop&q=80",
    rating: 8.8,
    year: 2010,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Action", "Adventure"],
    runtime: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    trailerId: "YoHD9XEInc0",
    popularity: 96
  },
  {
    id: 10,
    title: "Avatar: The Way of Water",
    tagline: "Return to Pandora.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    rating: 7.6,
    year: 2022,
    genre: "Action",
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: "3h 12m",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    trailerId: "d9MyW72ELq0",
    popularity: 94
  },
  {
    id: 11,
    title: "The Matrix",
    tagline: "Welcome to the Real World.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    rating: 8.7,
    year: 1999,
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Action"],
    runtime: "2h 16m",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    trailerId: "vKQi3bBA1y8",
    popularity: 95
  },
  {
    id: 12,
    title: "Gladiator II",
    tagline: "What we do in life echoes in eternity.",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&auto=format&fit=crop&q=80",
    rating: 7.7,
    year: 2024,
    genre: "Action",
    genres: ["Action", "Adventure", "Drama"],
    runtime: "2h 28m",
    director: "Ridley Scott",
    cast: ["Paul Mescal", "Pedro Pascal", "Denzel Washington", "Connie Nielsen"],
    description: "Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home.",
    trailerId: "4mgBncgHJHE",
    popularity: 93
  }
];
