import { Search, ChevronDown } from "lucide-react";

const SearchFilter = ({
  searchTerm,
  onSearchTermChange,
  category,
  categories = ['All Categories'],
  onCategoryChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <section className="max-w-[1250px] mx-auto px-5 lg:px-0 pb-8">
      <div className="border border-zinc-700 rounded-[26px] p-4 flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={searchTerm}
            onChange={(event) => onSearchTermChange?.(event.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full h-12 rounded-2xl bg-zinc-900 border border-zinc-700 pl-14 pr-4 text-white placeholder:text-zinc-500 outline-none focus:border-lime-400 transition"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative lg:w-52">
          <select
            value={category}
            onChange={(event) => onCategoryChange?.(event.target.value)}
            className="appearance-none w-full h-12 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 text-white outline-none focus:border-lime-400 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative lg:w-52">
          <select
            value={sortBy}
            onChange={(event) => onSortByChange?.(event.target.value)}
            className="appearance-none w-full h-12 rounded-2xl bg-zinc-900 border border-zinc-700 px-5 text-white outline-none focus:border-lime-400 cursor-pointer"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A-Z</option>
            <option>Name: Z-A</option>
            <option>Rating</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;