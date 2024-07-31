import { get } from 'http';
import React, { useEffect, useState } from 'react';

function dataMap() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/shoes')
      .then(response => response.json())
      .then(data => {
        setShoes(data);
      })
    
  }, []);

  return 
    shoes
      
  
}

export default dataMap;

