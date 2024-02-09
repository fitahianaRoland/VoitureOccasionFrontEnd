import React from 'react';
import '../assets/css/pagination.css';
import { useState } from 'react';

export default function PaginateFunction ({postPerPage,totalPost,paginate}) {
    const pageNumber = [];
    for (let i = 0; i < Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i + 1); // Ajoutez 1 pour inclure la première page
    }
    
    const [activePage, setActivePage] = useState(1);
    const handelPageClick = (number) => {
        setActivePage(number);
        paginate(number);
    }

    return (
        <div className='pagination'>
            {pageNumber.map((number) => {
                return (
                    <button
                        key={number}
                        className={activePage === number ? "active" : ""}
                        onClick={ () => {
                        handelPageClick(number);
                        paginate(number); }}>
                        {number}
                    </button>
                );
            })}
        </div>
    )
}
