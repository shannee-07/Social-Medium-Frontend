import React, { useState, useEffect } from 'react';
import './FilterComponent.css';
import { fetchCategoriesRoute } from '../../../utils/APIRoutes';
import axios from 'axios';

// const categories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11"]

const FilterComponent = ({ callback }) => {
    const [showCategories, setShowCategories] = useState(true);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const selected = () => {
        // console.log("NEW--------->")
        // console.log("filter: ", selectedFilter,"\n","type: ", selectedType,"\n"+"categories: ", selectedCategories);
        const body = {
            filters: selectedFilter,
            interests: selectedType,
            categories: selectedCategories
        }
        callback(body);
        // console.log();
        // console.log();
    };

    useEffect(() => {
        selected(); // Call selected function when component mounts
    }, [selectedFilter, selectedType, selectedCategories]); // Listen to changes in these state variables
    useEffect(() => {
        const fetchCategories = async () => {
            const result = await axios.get(fetchCategoriesRoute);
            // console.log("CATEGORIES API--------->")

            // console.log(result.data.categories);

            setCategories(result.data.categories);
        }
        fetchCategories();
    }, [])
    const toggleCategories = () => {
        if (showCategories) {
            setSelectedCategories([]);
        }
        setShowCategories(!showCategories);
        setShowCategoryDropdown(!showCategoryDropdown)
        selected();
    };

    const handleCategorySelection = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
        selected();
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
            <br />

            {showCategoryDropdown ? <div className="filter-dropdown">
                <label>Show Categories:</label>
                <select
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        // selected();
                    }}
                >
                    <option value="all">All Categories</option>
                    <option value="interest">My Interests Only</option>
                </select>
            </div> : null}

            <div className="filter-button">
                <button onClick={toggleCategories}>
                    {showCategories ? 'Hide Categories' : 'Select Specific Categories'}
                </button>
            </div>

            {showCategories && (
                <div className="filter-categories">
                    <h5>Select Categories</h5>
                    {categories.map((item) => {
                        const category = item.category;
                        return <label key={category}>
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategorySelection(category)}
                            />
                            {category}
                        </label>
                    })}
                </div>
            )}
        </div>
    );
};

export default FilterComponent;


