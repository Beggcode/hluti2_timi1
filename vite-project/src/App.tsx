import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('Beggi')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitted!')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="App">
      <header>
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </button>
        <h1>{name}</h1>
        {email && <p>{email}</p>}
      </header>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="Nafn"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Netfang"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button type="submit">Senda</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  )
}

export default App