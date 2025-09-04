const Navbar = () => {
    return (
        <nav className="flex justify-around items-center px-2 py-4 pt-10 bg-transparent backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-2xl font-bold">Home</h1>
          <h1 className="text-2xl font-bold">Favorites</h1>
          <h1 className="text-2xl font-bold">Forecast</h1>
          <h1 className="text-2xl font-bold">Settings</h1>
          <h1 className="text-2xl font-bold">About</h1>
        </nav>
    );
}

export default Navbar;