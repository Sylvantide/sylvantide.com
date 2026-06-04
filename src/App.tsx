import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-[#3c3b3c] font-sans">
      <header className="flex flex-col items-center mb-12">
        <img src="/logo.svg" className="logo-img w-48 h-48 mb-6" alt="Sylvantide Logo" />
        <h1 className="site-title text-6xl font-bold tracking-tight">Sylvantide</h1>
      </header>
      
      <main className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
          Software Development
        </p>
        <p className="text-xl mb-8 leading-relaxed">
          Cultivating digital landscapes through continuous growth and fluid innovation.
        </p>
        
        <div className="h-1 w-32 divider mx-auto mb-8"></div>
      </main>

      <footer className="mt-auto pt-12 text-sm text-muted">
        <p>
          <a href="mailto:admin@sylvantide.com" className="footer-link">
            admin@sylvantide.com
          </a>
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} Sylvantide LLC. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
