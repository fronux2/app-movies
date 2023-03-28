import { useState, useEffect } from 'react'

function App () {
  const [busqueda, setBusqueda] = useState('')
  const [cambio, setCambio] = useState(false)
  const [pelicula, setPelicula] = useState([])

  useEffect(() => {
    if (!cambio) return
    const api = `https://www.omdbapi.com/?t=${busqueda}&plot=full&apikey=d3a0ca58`
    const api2 = `https://www.omdbapi.com/?s=${busqueda}&page=2&apikey=d3a0ca58`
    fetch(`https://www.omdbapi.com/?s=${busqueda}&page=1&apikey=d3a0ca58`)
      .then(res => res.json())
      .then(data => {
        setPelicula(data.Search)
        setCambio(false)
        console.log(data)
      })
  }, [cambio])

  const handleSubmit = (event) => {
    event.preventDefault()
    setCambio(true)
  }
  const handleChange = (event) => {
    setBusqueda(event.target.value)
  }

  const estiloContenedor = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    justifyContent: 'center'
  }
  const contenedorPelicula = {
    border: '2px solid black',
    maxWidth: '300px',
    minWidth: '100px'
  }

  return (
    <main>
      <h1>App peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={busqueda} onChange={handleChange} />
        <button>Buscar</button>
      </form>
      <section style={estiloContenedor}>
        {pelicula.map(data => (
          <div key={data.imdbID} style={contenedorPelicula}>
            <h2>{data.Title}</h2>
            <img src={data.Poster} alt={data.imdbID} />
            <h3>{data.Year}</h3>
          </div>
        ))}
      </section>

    </main>
  )
}

export default App
