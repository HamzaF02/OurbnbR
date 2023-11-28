import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Replace with your Rental creation API function
import { createRental } from './rentalService';

const RentalFormComponent = () => {
    const history = useHistory();

    // Updated state for rental form
    const [rentalForm, setRentalForm] = useState({
        title: '',       // Assuming the Rental object has these fields
        dailyRate: 0,
        description: '',
        imageUrl: ''
    });

    // Updated function for handling input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRentalForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    // Updated function for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createRental(rentalForm); // API call
            if (response.success) {
                console.log(response.message);
                history.push('/rentals'); // Navigate to rentals page on success
            } else {
                console.log('Rental creation failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // JSX layout for the form
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={rentalForm.title}
                onChange={handleInputChange}
                required
            />
            <input
                type="number"
                name="dailyRate"
                value={rentalForm.dailyRate}
                onChange={handleInputChange}
                required
            />
            <textarea
                name="description"
                value={rentalForm.description}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="imageUrl"
                value={rentalForm.imageUrl}
                onChange={handleInputChange}
            />
            <button type="submit">Create Rental</button>
            <button type="button" onClick={() => history.push('/rentals')}>Back to Rentals</button>
        </form>
    );
};

export default RentalFormComponent;
