import { useEffect, useState } from 'react'
import './App.css'
import { Input } from './components/input'

function App() {
  // State
  const [name, setName] = useState<string>(() => {
    return localStorage.getItem('name') ?? ''
  })
  
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem('email') ?? ''
  })
  
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('isDark')
    return savedTheme !== null ? JSON.parse(savedTheme) : true
  })

  const [status, setStatus] = useState('')

  // Effects
  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

  useEffect(() => {
    localStorage.setItem('email', email)
  }, [email])

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark))
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitted!')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="App">
      <header>
        <button onClick={() => setIsDark(!isDark)}>
           {isDark ? 'Light' : 'Dark'} theme
        </button>
        <h1>{name || 'Type your name'}</h1>
        {email && <p>{email}</p>}
      </header>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
          
          <Input 
            type="text" 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />

          <Input 
            type="email" 
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <button type="submit">Send</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  )
}
export default App