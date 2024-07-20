import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css'

const App = () => {
  const [data, setData] = useState([{ text: 'Sample text 1' },
    { text: 'Sample text 2' },
    { text: 'Sample text 3' }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      {data.map((item, index) => (
        <Card key={index} text={item.text} />
      ))}
    </div>
  );
};

export default App;
