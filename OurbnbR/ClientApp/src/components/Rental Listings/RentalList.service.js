import React, { useEffect, useState } from 'react';
import useRentalApi from './useRentalApi';

const RentalList = () => {
    const { getRental, createRental } = useRentalApi();
    const [Rental, setRental] = useState([]);

    useEffect(() => {
        const fetchRental = async () => {
            const fetchedRental = await getRental();
            setRental(fetchedRental);
        };

        fetchRental();
    }, []);


};