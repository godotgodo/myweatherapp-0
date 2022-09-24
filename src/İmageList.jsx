import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function İmageList({ search, searched }) {
    const [datas, setdatas] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: search,
                    per_page: 10
                },
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_IMAGE_UNSPLASH_AUTH_KEY}`
                }
            })
            setdatas(result.data.results);
        })()
    }, [searched])

    return (
        <div className='flex flex-wrap mt-8 '>
            {datas !== undefined &&
                datas.map(data =>
                    <img src={data.urls.small} alt="" key={data.id} className="m-1 rounded shadow-md object-cover w-56" />
                )
            }
        </div>
    )
}
