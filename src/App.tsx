import { useState, useEffect } from 'react'
import './App.css'
import privacyMd from './privacy.md?raw'
import termsMd from './terms.md?raw'

function renderMarkdown(md: string) {
  const lines = md.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={idx} className="h-4" />;
    
    // Headers
    if (trimmed.startsWith('# ')) {
      return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{trimmed.slice(2)}</h1>;
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={idx} className="text-xl font-bold mt-6 mb-3">{trimmed.slice(3)}</h2>;
    }
    
    // Bullet lists
    if (trimmed.startsWith('* ')) {
      return (
        <li key={idx} className="ml-6 list-disc mb-2">
          {parseInlineMarkdown(trimmed.slice(2))}
        </li>
      );
    }
    
    // Default paragraph
    return (
      <p key={idx} className="mb-4 leading-relaxed text-left">
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  
  while (currentText.length > 0) {
    const boldIndex = currentText.indexOf('**');
    const linkIndex = currentText.indexOf('[');
    
    if (boldIndex === -1 && linkIndex === -1) {
      parts.push(<span key={parts.length}>{currentText}</span>);
      break;
    }
    
    if (boldIndex !== -1 && (linkIndex === -1 || boldIndex < linkIndex)) {
      if (boldIndex > 0) {
        parts.push(<span key={parts.length}>{currentText.slice(0, boldIndex)}</span>);
      }
      const nextBold = currentText.indexOf('**', boldIndex + 2);
      if (nextBold !== -1) {
        const boldText = currentText.slice(boldIndex + 2, nextBold);
        parts.push(<strong key={parts.length} className="font-bold text-[#08060d] dark:text-[#f3f4f6]">{boldText}</strong>);
        currentText = currentText.slice(nextBold + 2);
      } else {
        parts.push(<span key={parts.length}>**</span>);
        currentText = currentText.slice(boldIndex + 2);
      }
    } else {
      if (linkIndex > 0) {
        parts.push(<span key={parts.length}>{currentText.slice(0, linkIndex)}</span>);
      }
      const closingBracket = currentText.indexOf(']', linkIndex);
      const openingParen = currentText.indexOf('(', closingBracket);
      const closingParen = currentText.indexOf(')', openingParen);
      
      if (closingBracket !== -1 && openingParen === closingBracket + 1 && closingParen !== -1) {
        const linkText = currentText.slice(linkIndex + 1, closingBracket);
        const url = currentText.slice(openingParen + 1, closingParen);
        parts.push(
          <a key={parts.length} href={url} target={url.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="footer-link">
            {linkText}
          </a>
        );
        currentText = currentText.slice(closingParen + 1);
      } else {
        parts.push(<span key={parts.length}>[</span>);
        currentText = currentText.slice(linkIndex + 1);
      }
    }
  }
  return parts;
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const navigate = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  const isHome = currentPath === '/' || currentPath === '/index.html'
  const isPrivacy = currentPath === '/privacy'
  const isTerms = currentPath === '/terms'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-[#3c3b3c] font-sans">
      <header className="flex flex-col items-center mt-8 mb-6">
        <a href="/" onClick={(e) => navigate('/', e)} className="logo-header-link">
          <img src="/logo-no-bg-04.png" className="logo-img w-72 h-72 mb-6" alt="Sylvantide Logo" />
          <h1 className="site-title text-6xl font-bold tracking-tight">Sylvantide</h1>
        </a>
      </header>
      
      <main className="max-w-2xl text-center w-full">
        {isHome ? (
          <>
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Software Development
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Cultivating digital landscapes through continuous growth and fluid innovation.
            </p>
            
            <div className="h-1 w-32 divider mx-auto mb-8"></div>
          </>
        ) : (
          <div className="markdown-content text-left max-w-2xl w-full px-4">
            <a href="/" onClick={(e) => navigate('/', e)} className="back-link">
              ← Back to Home
            </a>
            {isPrivacy && renderMarkdown(privacyMd)}
            {isTerms && renderMarkdown(termsMd)}
          </div>
        )}
      </main>

      <footer className="mt-auto mb-4 pt-12 text-sm text-muted">
        <p>
          <a href="mailto:admin@sylvantide.com" className="footer-link">
            admin@sylvantide.com
          </a>
        </p>
        <div className="footer-info mt-2">
          <span>© {new Date().getFullYear()} Sylvantide LLC. All rights reserved.</span>
          <span className="footer-separator">•</span>
          <span>Based in Atlanta, Georgia</span>
          <span className="footer-separator">•</span>
          <a
            href="https://github.com/Sylvantide"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-github-link"
          >
            <svg
              className="github-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub</span>
          </a>
          <span className="footer-separator">•</span>
          <a href="/privacy" onClick={(e) => navigate('/privacy', e)} className="footer-link">
            Privacy Policy
          </a>
          <span className="footer-separator">•</span>
          <a href="/terms" onClick={(e) => navigate('/terms', e)} className="footer-link">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
