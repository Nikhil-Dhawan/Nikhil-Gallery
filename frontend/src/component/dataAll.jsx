import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyComponent.css'; // Import your CSS for styling
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getall');
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTileClick = (itemId) => {
    setSelectedItemId(itemId);
    console.log(itemId);
    navigate(`/single/${itemId}`);
  };

  return (
    <div>
      <h1>Displaying all the projects in a gallery view:</h1>
      {/* <h2>Data from API:</h2> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tile-container">
          {data.map((item) => (
            <div
              className={`tile ${selectedItemId === item._id ? 'selected' : ''}`}
              key={item._id}
              onClick={() => handleTileClick(item._id)}
            >
              <h3>{item.Title}</h3>
              <p><strong>_id:</strong> {item._id}</p>
              <p><strong>Technologies:</strong> {item.Technologies}</p>
              <p><strong>Frontend:</strong> {item.Frontend}</p>
              <p><strong>Backend:</strong> {item.Backend}</p>
              <p><strong>Databases:</strong> {item.Databases}</p>
              <p><strong>Infrastructure:</strong> {item.Infrastructure}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyComponent;
