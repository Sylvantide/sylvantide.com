import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-[#3c3b3c] font-sans">
      <header className="flex flex-col items-center mb-12">
        <img src="/logo.svg" className="w-48 h-48 mb-6" alt="Sylvantide Logo" />
        <h1 className="text-6xl font-bold tracking-tight text-[#6bab0a]">Sylvantide</h1>
      </header>
      
      <main className="max-w-2xl text-center">
        <p className="text-xl mb-8 leading-relaxed">
          Nurturing growth and flowing with innovation. We are dedicated to building a sustainable future.
        </p>
        
        <div className="h-1 w-32 bg-[#1082dc] mx-auto mb-8"></div>
        
        <p className="text-sm uppercase tracking-widest text-[#955210] font-semibold">
          Coming Soon
        </p>
      </main>

      <footer className="mt-auto pt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Sylvantide LLC. All rights reserved.
      </footer>
    </div>
  )
}

export default App
