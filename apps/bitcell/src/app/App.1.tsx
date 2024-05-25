import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Network } from './Bitcellular';
import { Game } from './Game';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav className="mb-4">
                        <Link to="/" className="text-xl m-2">Home</Link>
                        <Link to="/network" className="text-xl m-2">Bitcellular Network</Link>
                        <Link to="/game" className="text-xl m-2">Game</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/network" element={<Network />} />
                        <Route path="/game" element={<Game />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

const Home: React.FC = () => (
    <div>
        <h1 className="text-4xl font-bold">Bitcell Trading Bot</h1>
        <p>Welcome to the Bitcell trading bot application.</p>
    </div>
);

export default App;