import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, 
  Search, 
  Heart, 
  Star, 
  Play, 
  Sparkles, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Filter, 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  Trash2, 
  TrendingUp, 
  Award, 
  Clapperboard 
} from 'lucide-react';
import { FALLBACK_MOVIES, Movie } from './data/movies';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'watchlist'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Watchlist State (LocalStorage)
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Theme State (LocalStorage)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cinevault_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'year' | 'title'>('popularity');

  // Modals
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTrailerId, setActiveTrailerId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('cinevault_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('cinevault_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedMovie || activeTrailerId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedMovie, activeTrailerId]);

  const toggleWatchlist = (movie: Movie, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isMovieInWatchlist = (id: string | number) => {
    return watchlist.some((m) => m.id === id);
  };

  const currentHeroMovie = FALLBACK_MOVIES[heroIndex] || FALLBACK_MOVIES[0];
  const genres = ['All', 'Action', 'Adventure', 'Animation', 'Biography', 'Crime', 'Drama', 'Sci-Fi'];

  const filteredMovies = FALLBACK_MOVIES.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genres.includes(selectedGenre);
    const matchesRating = movie.rating >= selectedRating;
    return matchesSearch && matchesGenre && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return (b.popularity || 0) - (a.popularity || 0);
  });

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#faf8ff] text-slate-800'}`}>
      
      {/* FROSTED ACRYLIC NAVBAR */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0f19]/80 border-white/5' : 'bg-white/80 border-slate-200/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-2xl pastel-btn-gradient p-0.5 shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform">
              <div className={`h-full w-full rounded-[14px] flex items-center justify-center ${isDarkMode ? 'bg-[#0b0f19]' : 'bg-white'}`}>
                <Film className="h-4 w-4 text-purple-300" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight pastel-text-gradient">
                Conquerors 03
              </span>
              <span className="text-[10px] block font-mono text-purple-300/80 -mt-1 font-semibold">CineVault Platform</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl">
            {[
              { id: 'home', label: 'Home' },
              { id: 'discover', label: 'Discover' },
              { id: 'watchlist', label: `Watchlist (${watchlist.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'pastel-btn-gradient text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'discover') setActiveTab('discover');
                }}
                className={`pl-9 pr-3.5 py-1.5 rounded-full text-xs outline-none transition-all w-44 focus:w-60 border ${
                  isDarkMode 
                    ? 'bg-slate-900/60 border-white/10 text-slate-200 placeholder-slate-400 focus:border-purple-300/50' 
                    : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-400'
                }`}
              />
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all ${
                isDarkMode 
                  ? 'bg-slate-900/60 border-white/10 text-purple-300 hover:bg-slate-800/80' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Watchlist Counter Button */}
            <button
              onClick={() => setActiveTab('watchlist')}
              className="relative p-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 hover:bg-purple-500/20 transition-all"
            >
              <Heart className="h-4 w-4 fill-purple-400/20 text-purple-300" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b backdrop-blur-xl ${isDarkMode ? 'bg-[#0b0f19]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}
          >
            <div className="px-4 py-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab !== 'discover') setActiveTab('discover');
                  }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-900 border border-white/10 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'discover', label: 'Discover' },
                  { id: 'watchlist', label: `Watchlist (${watchlist.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-semibold ${
                      activeTab === tab.id
                        ? 'pastel-btn-gradient text-white'
                        : 'bg-white/5 border border-white/10 text-slate-400'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* ==================== TAB 1: HOME PAGE ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            
            {/* HERO CAROUSEL SECTION */}
            <section className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-slate-900 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${currentHeroMovie.backdrop})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/90 via-[#0b0f19]/40 to-transparent sm:w-2/3" />

              <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-300/10 border border-purple-300/20 text-purple-200 text-xs font-semibold backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-purple-300" />
                  <span>Featured Release</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                  {currentHeroMovie.title}
                </h1>

                {currentHeroMovie.tagline && (
                  <p className="text-purple-200/90 font-mono text-xs sm:text-sm italic">
                    "{currentHeroMovie.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center text-amber-300 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    <Star className="h-3.5 w-3.5 fill-amber-300 mr-1" />
                    {currentHeroMovie.rating}
                  </span>
                  <span>{currentHeroMovie.year}</span>
                  <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-purple-200 font-mono">
                    {currentHeroMovie.genre}
                  </span>
                  <span>{currentHeroMovie.runtime}</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {currentHeroMovie.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTrailerId(currentHeroMovie.trailerId)}
                    className="px-6 py-3.5 rounded-full pastel-btn-gradient text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>Watch Trailer</span>
                  </button>

                  <button
                    onClick={(e) => toggleWatchlist(currentHeroMovie, e)}
                    className={`px-6 py-3.5 rounded-full border font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-all backdrop-blur-md ${
                      isMovieInWatchlist(currentHeroMovie.id)
                        ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isMovieInWatchlist(currentHeroMovie.id) ? 'fill-emerald-300' : ''}`} />
                    <span>{isMovieInWatchlist(currentHeroMovie.id) ? 'In Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                </div>

                {/* Hero Slide Indicators */}
                <div className="flex items-center space-x-2 pt-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        heroIndex === idx ? 'w-8 bg-purple-300' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* REACT BITS 3D CAROUSEL SECTION */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-purple-300/10 border border-purple-300/20 rounded-2xl text-purple-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">React Bits 3D Motion Carousel</h2>
                    <p className="text-xs text-slate-400">Interactive 3D component showcase</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-200 px-3 py-1 rounded-full bg-purple-300/10 border border-purple-300/20">
                  Pastel Acrylic UI
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {FALLBACK_MOVIES.slice(0, 4).map((movie) => (
                  <motion.div
                    key={movie.id}
                    whileHover={{ scale: 1.05, rotateY: 4, y: -6 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedMovie(movie)}
                    className="relative rounded-2xl overflow-hidden acrylic-card cursor-pointer group aspect-[2/3]"
                  >
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-amber-300 flex items-center">
                      <Star className="h-3 w-3 fill-amber-300 mr-1" />
                      {movie.rating}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 space-y-1">
                      <h3 className="font-bold text-sm text-white truncate">{movie.title}</h3>
                      <p className="text-[11px] text-purple-200 font-mono">{movie.genre} • {movie.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CATEGORY ROW: TRENDING NOW */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-300" />
                  <span>Trending Now</span>
                </h2>
                <button onClick={() => setActiveTab('discover')} className="text-xs text-purple-300 hover:text-purple-200 font-medium flex items-center">
                  <span>Explore All</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {FALLBACK_MOVIES.slice(0, 8).map((movie) => (
                  <motion.div
                    key={movie.id}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedMovie(movie)}
                    className="acrylic-card hover:border-purple-300/30 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <button
                        onClick={(e) => toggleWatchlist(movie, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                          isMovieInWatchlist(movie.id)
                            ? 'pastel-btn-gradient text-white border-transparent'
                            : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isMovieInWatchlist(movie.id) ? 'fill-white' : ''}`} />
                      </button>

                      <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 flex items-center">
                        <Star className="h-3 w-3 fill-amber-300 mr-1" />
                        {movie.rating}
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors truncate">
                        {movie.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{movie.genre}</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CATEGORY ROW: TOP RATED */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Award className="h-5 w-5 text-amber-300" />
                  <span>Top Rated Blockbusters</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {FALLBACK_MOVIES.filter(m => m.rating >= 8.5).map((movie) => (
                  <motion.div
                    key={movie.id}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedMovie(movie)}
                    className="acrylic-card hover:border-purple-300/30 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={(e) => toggleWatchlist(movie, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                          isMovieInWatchlist(movie.id)
                            ? 'pastel-btn-gradient text-white border-transparent'
                            : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isMovieInWatchlist(movie.id) ? 'fill-white' : ''}`} />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 flex items-center">
                        <Star className="h-3 w-3 fill-amber-300 mr-1" />
                        {movie.rating}
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors truncate">{movie.title}</h3>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{movie.genre}</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 2: DISCOVER PAGE ==================== */}
        {activeTab === 'discover' && (
          <div className="space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white">Discover Movies</h1>
              <p className="text-xs text-slate-400">Filter through our collection with soft acrylic search controls</p>
            </div>

            {/* FILTERS TOOLBAR */}
            <div className="acrylic-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, overview, or cast..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-slate-900/80 border border-white/10 text-white outline-none focus:border-purple-300/50 transition-all"
                />
              </div>

              {/* Genre Pills */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
                  <Filter className="h-3.5 w-3.5 text-purple-300" />
                  <span>Genre Filter</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedGenre === genre
                          ? 'pastel-btn-gradient text-white shadow-md shadow-purple-500/20 scale-105'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating & Sort Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Minimum Rating ({selectedRating}+ ⭐)</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-300/50"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={8.5}>8.5+ Exceptional</option>
                    <option value={8.0}>8.0+ Highly Rated</option>
                    <option value={7.5}>7.5+ Good</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-300/50"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="year">Release Date (Newest)</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Showing <strong className="text-white">{filteredMovies.length}</strong> movies</span>
              </div>

              {filteredMovies.length === 0 ? (
                <div className="text-center py-20 acrylic-card rounded-3xl space-y-3">
                  <Clapperboard className="h-12 w-12 text-slate-500 mx-auto" />
                  <h3 className="text-base font-semibold text-white">No movies found</h3>
                  <p className="text-xs text-slate-400">Try adjusting your search query or genre filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {filteredMovies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      whileHover={{ y: -6 }}
                      onClick={() => setSelectedMovie(movie)}
                      className="acrylic-card hover:border-purple-300/30 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <button
                          onClick={(e) => toggleWatchlist(movie, e)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                            isMovieInWatchlist(movie.id)
                              ? 'pastel-btn-gradient text-white border-transparent'
                              : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
                          }`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${isMovieInWatchlist(movie.id) ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                      <div className="p-4 space-y-1">
                        <h3 className="font-bold text-sm text-white group-hover:text-purple-200 transition-colors truncate">{movie.title}</h3>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>{movie.genre}</span>
                          <span className="text-amber-300 font-bold flex items-center"><Star className="h-3 w-3 fill-amber-300 mr-0.5" />{movie.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: WATCHLIST PAGE ==================== */}
        {activeTab === 'watchlist' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h1 className="text-3xl font-black text-white">Your Watchlist</h1>
                <p className="text-xs text-slate-400">Movies saved to LocalStorage for later viewing</p>
              </div>
              {watchlist.length > 0 && (
                <button
                  onClick={() => setWatchlist([])}
                  className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 text-xs font-semibold transition-all flex items-center space-x-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {watchlist.length === 0 ? (
              <div className="text-center py-24 acrylic-card rounded-3xl space-y-4 max-w-md mx-auto">
                <div className="h-16 w-16 rounded-full bg-purple-300/10 border border-purple-300/20 flex items-center justify-center mx-auto text-purple-300">
                  <Heart className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-lg font-bold text-white">No movies in your watchlist yet</h3>
                <p className="text-xs text-slate-400 leading-relaxed px-6">
                  Explore trending movies or use Discover filters to add movies to your personal watchlist!
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-6 py-3 rounded-full pastel-btn-gradient text-white text-xs font-semibold shadow-md shadow-purple-500/20 hover:scale-105 transition-all"
                >
                  Discover Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {watchlist.map((movie) => (
                  <motion.div
                    key={movie.id}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedMovie(movie)}
                    className="acrylic-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[2/3]">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => toggleWatchlist(movie, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-red-500/80 text-white border border-red-400/40 shadow-md"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-sm text-white truncate">{movie.title}</h3>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{movie.genre}</span>
                        <span className="text-amber-300 font-bold flex items-center"><Star className="h-3 w-3 fill-amber-300 mr-0.5" />{movie.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MOVIE DETAIL MODAL */}
      <AnimatePresence>
        {selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMovie(null)}
              className="fixed inset-0 bg-[#0b0f19]/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto"
            >
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-64 sm:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${selectedMovie.backdrop})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{selectedMovie.title}</h2>
                    <p className="text-xs text-purple-200 font-mono mt-1">{selectedMovie.genres.join(' • ')}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTrailerId(selectedMovie.trailerId);
                      setSelectedMovie(null);
                    }}
                    className="px-5 py-2.5 rounded-full pastel-btn-gradient text-white font-semibold text-xs flex items-center space-x-2 shadow-md shadow-purple-500/20"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>Trailer</span>
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap gap-4 text-xs text-slate-300 border-b border-white/5 pb-4">
                  <span className="flex items-center text-amber-300 font-bold"><Star className="h-4 w-4 fill-amber-300 mr-1" />{selectedMovie.rating}</span>
                  <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />{selectedMovie.year}</span>
                  <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />{selectedMovie.runtime}</span>
                  <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1 text-slate-400" />Dir: {selectedMovie.director}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Overview</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedMovie.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Main Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.cast.map((actor) => (
                      <span key={actor} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* YOUTUBE TRAILER MODAL */}
      <AnimatePresence>
        {activeTrailerId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrailerId(null)}
              className="fixed inset-0 bg-[#0b0f19]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="font-bold text-sm text-white">Movie Trailer Preview</span>
                <button
                  onClick={() => setActiveTrailerId(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeTrailerId}?autoplay=1`}
                  title="Movie Trailer"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0b0f19] py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Film className="h-4 w-4 text-purple-300" />
            <span className="font-bold text-slate-300">Conquerors 03 Movie — Pastel & Acrylic CineVault</span>
          </div>
          <p>© 2026 Conquerors 03 Movie Discovery & Watchlist.</p>
        </div>
      </footer>
    </div>
  );
}
