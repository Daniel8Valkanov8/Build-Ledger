import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const IncomesTable = () => {
    const { id } = useParams();
   
    const navigate = useNavigate();

    // Функция за презареждане на апартаментите
    const fetchApartmentsAndFloors = async () => {
        console.log(`Fetching apartments and floors for cooperation ${id}`);
        try {
            const [apartmentsResponse, floorsResponse] = await Promise.all([
                axios.get(`http://localhost:8080/apartments/${id}`),
                axios.get(`http://localhost:8080/floors/${id}`)
            ]);

          
            console.log("Apartments:", apartmentsResponse.data);
            console.log("Floors:", floorsResponse.data);
        } catch (err) {
            console.error(err);
            
        }
    };

    useEffect(() => {
        fetchApartmentsAndFloors();
    }, [id]);


    return (
        <div>
            <h1>Incomes</h1>
            
             <div>
            </div>
    
            
        </div>
    );
};

export default IncomesTable;
