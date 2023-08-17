function Header() {
  return (
    <header className="w-[80%] mx-auto relative flex items-center gap-2 py-10 lg:py-6">
      <img className="hidden lg:block lg:absolute h-20 lg:h-32" src="./mcd-banner.png" alt="mcd-banner.png" />
      <h1 className="w-full text-6xl font-bold text-center py-4">Orderin</h1>
    </header>
  )
}

export default Header;