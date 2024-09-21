import React, { useState, useEffect, useRef } from 'react';
import './LeaderBoard.css';

const Leaderboard = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Fetching user data
    const getUsers = async () => {
      try {
        const response = await fetch('https://trafficthinktank.com/wp-json/mjtw/v1/community');
        const data = await response.json();
        setUsers(data.sort((a, b) => a.ranking - b.ranking));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();

    // Focus search input when "/" is pressed
    const handleKeyup = (event) => {
      if (event.key === '/') {
        searchRef.current.focus();
      }
    };

    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, []);

  // Filtering users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Get medal color based on ranking
  const getMedal = (ranking) => {
    if (ranking === 1) return "#FED931"; // Gold
    if (ranking === 2) return "#CFCFD0"; // Silver
    if (ranking === 3) return "#BD7B65"; // Bronze
    return false;
  };

  return (
    <>
    <div className="relative container px-4 mx-auto">
      <form action="" className="max-w-screen-sm mt-12 mx-auto w-full px-4 md:px-0">
        <input
          type="text"
          className="w-full p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Search (Press “/” to focus)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
      </form>

      <div className="mt-24 mx-auto space-y-4 relative z-10 max-w-screen-sm">
        {isLoading && (
          <img
            src="https://assets.codepen.io/925962/ttt.png"
            className="loader mt-32 mx-auto"
            alt="Loading..."
          />
        )}
        {filteredUsers.map(user => (
          <a
            key={user.ranking}
            href={user.URL}
            className="member flex w-full items-center space-x-4 px-4 py-6 lg:px-8 rounded-sm bg-gray-50 hover:bg-gray-100 hover:bg-opacity-80"
            data-rank={user.ranking}
          >
            <div className="relative">
              <div
                className={`p-1 w-8 h-8 shadow absolute top-0 left-0 -mt-3 -ml-3 rounded-full flex items-center justify-center border-4 border-white ${
                  getMedal(user.ranking) ? 'bg-white' : 'bg-indigo-800'
                }`}
              >
                {getMedal(user.ranking) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 140 140">
                    <g data-name="Group 3">
                      <path data-name="Rectangle 1" fill="none" d="M0 0h140v140H0z" />
                      <path
                        data-name="Path 20"
                        fill={getMedal(user.ranking)}
                        d="M98.186 123.018c2.412 1.38 8.015.685 8.425 2.027.928 4.238.66 8.77.485 13.182-.024.618-1.953 1.661-3 1.665-23.057.1-46.116.058-69.173.1-3.636.228-3.391-3.044-3.332-5.672-.031-9.6-.031-9.6 9.591-11.058 0-5.622.2-11.353-.07-17.064-.177-3.807 1.145-5.23 4.941-4.9 14.807.57 14.462 1.295 16.52-13.616.573-4.813-1.265-8.092-5.363-11.225-5.516-3.877-8.811-11.154-14.18-15.145-21.289-5.1-30.645-28.749-31.013-48.695-.5-8.677 13.886-3.787 19.265-5.008C32.637.002 32.637.001 40.225.001h59.741c7.2 0 7.2 0 7.843 7.6h12.684c6.4.005 7.157.853 6.748 7.389-.921 14.724-5.268 28.11-16.34 38.364-5.055 5.349-13.526 5.937-18.249 11.638-4.328 6.245-12.793 11.017-15.55 17.977a136.059 136.059 0 002.481 16.873c.13.674 2 1.386 3.091 1.434 22.145-.261 14.015-.582 15.512 21.742zM107.41 15.64a212.829 212.829 0 01-7.558 35.835c10.433-4.424 20.554-23.466 18.968-35.835zM38.994 51.708l-7.563-36h-11.59c1.794 14.812 6.278 27.667 19.153 36z"
                      />
                    </g>
                  </svg>
                ) : (
                  <span className="inline-block text-sm text-white">{user.ranking}</span>
                )}
              </div>
              <img
                src={user.image}
                alt={user.name}
                className="rounded-md shadow-lg w-24 h-24 object-cover"
              />
            </div>
            <div className="lg:flex lg:flex-grow lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-bold text-indigo-900">{user.name}</p>
                <p className="user-title text-indigo-800 text-opacity-80 text-sm">{user.title}</p>
              </div>
              <div className="mt-1 flex items-center space-x-2 lg:space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 lg:h-8 opacity-75" viewBox="0 0 67.698 58.783">
                  {/* SVG Path Definitions */}
                </svg>
                <span className="text-indigo-800 text-opacity-80 lg:text-xl">{user.points}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

export default Leaderboard;
