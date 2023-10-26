import React from 'react';
import './TrendingCategories.css'; // Create a CSS file for styling

const TrendingCategories = ({ trendingCategories }) => {
  return (
    <div className="trending-categories-container">
      <h2 className="trending-categories-title">Top Trending Categories</h2>
      <div className="category-list">
        {trendingCategories.map((category, index) => (
          <div className="category-item" key={index}>
            <span className="category-name">#{category.name}</span>
            <span className="post-count">({category.postCount})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;
