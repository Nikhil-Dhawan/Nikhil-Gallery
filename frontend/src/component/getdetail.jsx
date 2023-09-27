import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Getdetail() {
  const { id } = useParams(); // Access the 'id' parameter from the route
//   console.log(id);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getOne/${id}`);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No data found.</p>;
  }

  // Find the item with the matching ID
//   const selectedItem = data.find((item) => item._id === id);

//   if (!selectedItem) {
//     return <p>Item with ID {id} not found.</p>;
//   }
return (
    <div className="tile-container">
      <div className="tile">
        <h1>{data.Title}</h1>
        <p><strong>_id:</strong> {data._id}</p>
        <p><strong>Technologies:</strong> {data.Technologies}</p>
        <p><strong>Frontend:</strong> {data.Frontend}</p>
        <p><strong>Backend:</strong> {data.Backend}</p>
        <p><strong>Databases:</strong> {data.Databases}</p>
        <p><strong>Infrastructure:</strong> {data.Infrastructure}</p>
      </div>
    </div>
  );
}

export default Getdetail;
