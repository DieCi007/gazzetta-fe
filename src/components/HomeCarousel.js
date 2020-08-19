import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeCarousel() {
    const [articles, setArticles] = useState([]);
    console.log();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/article`);
            console.log(response.data)
        }
        fetchData();
    }, [])
    return (
        <div id="homeCarousel">
            ciao
        </div>
    )
}

export default HomeCarousel
