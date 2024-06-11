import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list, user, setFood_List, search } = useContext(StoreContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const foodDisplay = document.querySelector('.food-display');
            if (foodDisplay) {
                const foodDisplayTop = foodDisplay.getBoundingClientRect().top;
                setIsVisible(foodDisplayTop < windowHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial visibility on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response;
                if (search) {
                    response = await fetch(`/api/item/search_item?search=${search}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                } else {
                    response = await fetch('/api/item/getallitems', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ location: user.location })
                    });
                }

                if (response.ok) {
                    const data = await response.json();
                    setFood_List(data.data);
                } else {
                    console.error('Failed to fetch items');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [user.location, search]);

    const filteredFoodList = food_list.filter(item => {
        // If the user is a seller, exclude their items from the list
        if (user.isSeller && item.sellerId === user.id) {
            return false;
        }
        // Include item if it matches the selected category or if the category is "All"
        return category === 'All' || item.category.includes(category);
    });

    return (
        <div className='mx-5 mb-10 md:mx-16 food-display'>
            <h2 className='mb-9 md:text-2xl font-mono font-semibold text-lg text-center'>- Top Dishes Near You -</h2>
            <div className={`flex flex-wrap ${isVisible ? 'animate-slide-in' : ''}`}>
                {filteredFoodList.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={'/api/images/' + item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
