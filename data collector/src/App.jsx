import React, { useEffect, useState } from 'react';
import { Route,Routes, BrowserRouter } from 'react-router-dom';
import Card from './components/Card';
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/texts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<>
      <div className="app">
      {data.map((item, index) => (
        <Card key={index} text={item.content} />
      ))}
    </div>
        </>} />
    <Route exact path="/signup" element={<>
      <Signup />
        </>} />
        <Route exact path="/login" element={<>
      <Login />
        </>} />
        <Route exact path="/leaderboard" element={<>
      <LeaderBoard />
        </>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  );
};

export default App;
