// FilterComponent.js
import React, { useState } from 'react';
import './FilterComponent.css';

const categories = ["c1", "c2", "c3","c4", "c5", "c6","c7", "c8", "c9","c10", "c11"]

const FilterComponent = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleCategorySelection = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    return (
        <div className="filter-container">
            <div className="filter-dropdown">
                <label>Filter by:</label>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="all">All Posts</option>
                    <option value="friends">Friends Only</option>
                </select>
            </div>

            <div className="filter-dropdown">
                <label>Show:</label>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="all">Show All Types</option>
                    <option value="interest">Show My Interests Only</option>
                </select>
            </div>

            <div className="filter-button">
                <button onClick={toggleCategories}>
                    {showCategories ? 'Hide Categories' : 'Select Specific Categories'}
                </button>
            </div>

            {showCategories && (
                <div className="filter-categories">
                    <h3>Show List of Categories</h3>
                    {categories.map((category) => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategorySelection(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterComponent;
