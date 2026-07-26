const Footer = () => {
  return (
    <footer className="border-t border-zinc-700 py-10">
      <div className="max-w-[1650px] mx-auto px-5 text-center">
        <h2 className="text-2xl font-bold">
          <span className="text-white">Sky</span>
          <span className="text-lime-400">Mart</span>
        </h2>

        <p className="mt-4 text-zinc-500 text-xs">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </div>
    </footer>
  );
};

export default Footer;