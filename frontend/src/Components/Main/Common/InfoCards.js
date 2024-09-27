import React from 'react';

const cardsData = [
    { 
        id: 1, 
        image: 'https://via.placeholder.com/50', 
        boldText: 'Best Prices & Orders', 
        smallText: 'Orders $50 or more' 
    },
    { 
        id: 2, 
        image: 'https://via.placeholder.com/50', 
        boldText: 'Free Shipping', 
        smallText: 'On orders over $100' 
    },
    { 
        id: 3, 
        image: 'https://via.placeholder.com/50', 
        boldText: '24/7 Customer Support', 
        smallText: 'We’re here to help' 
    },
    { 
        id: 4, 
        image: 'https://via.placeholder.com/50', 
        boldText: 'Secure Payment', 
        smallText: '100% secure payment' 
    },
    { 
        id: 5, 
        image: 'https://via.placeholder.com/50', 
        boldText: 'Fast Delivery', 
        smallText: 'Get it within 2 days' 
    },
];

const InfoCards = () => {
    return (
        <div className="max-w-full py-12 ml-12 mr-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className="flex items-center bg-gray-200 p-4 shadow-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                        {/* Image on the left */}
                        <img 
                            src={card.image} 
                            alt={card.boldText} 
                            className="w-12 h-12 object-contain mr-4"
                        />
                        {/* Text content on the right */}
                        <div className="flex flex-col">
                            <span className="text-lg font-bold mb-1">{card.boldText}</span>
                            <span className="text-sm text-gray-600">{card.smallText}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCards;
