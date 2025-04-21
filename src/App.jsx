import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameCardComponent from './GameCardComponent'

const gameCards = [
  {name:"Far Cry 3", rating:4, img: "image1.png"},
  {name:"Geometry Dash", rating:5, img: "image2.png" },
  {name:"Detroit Become Human", rating:4, img: "image3.png"},
  {name:"Forager", rating:3, img: "image4.png"},
  {name:"Just Cause 3", rating:5, img: "image5.png"},
  {name:"The Witness", rating:4, img: "image6.png"},
  {name:"Raft", rating:4, img: "image7.png"},
  {name:"Cuphead", rating:4, img: "image8.png"},
  {name:"Firewatch", rating:4, img: "image9.png"},
  {name:"Rust", rating:1, img: "image10.png"}
]

function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  function searchQuery(){
    console.log('search game cards: ', search)
  }
  return (
    <>
            <div className="main-header-area">
            <div class="logo-container">
                <div class="logo">
                    <img src="images/logos/logo.png" alt="" />
                </div>
            </div>
            <div class="title-area">
                <div class="title">
                    <p>GameVault</p>
                </div>
            </div>
            <div class="buttons-area">
                <div class="log-in">
                    <button>Log in</button>
                </div>                
                <div class="register">
                    <button>Register</button>
                </div>
                <div class="recent">
                    <div class="recent-button">
                        <img src="images/logos/history.png" alt="" />
                    </div>
                </div>
                <div class="search-area">
                    <div class="search-button">
                        <img src="images/logos/search.png" alt="" />
                    </div>
                    <form class="search-text-area" onSubmit={(e) => {e.preventDefault(); searchQuery(); }}>
                        <input type="text" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        />
                        <button class="search-submit hidden" type='submit'>Search</button> 
                    </form>
                  </div>
            </div>
        </div>
        <main class="main-area">
            <div class="main-inner-container">
                <h1 class="catalogue-title">Catalogue</h1>
              {gameCards.map((gameCard) => (
              <GameCardComponent gameCard={gameCard} />
              ))} 
            </div>
        </main>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      
    </>
  )
}

export default App
