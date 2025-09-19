import React from 'react';
import Breadcrumb_Container from '../Common/Breadcrumb/Index';

const categories = [
  { name: 'Men', image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/29034920/2024/5/16/e2f7fbcd-be4b-471c-a82b-3e917c05ba791715861944578-WROGN-Men-Shirts-9851715861944134-1.jpg' },
  { name: 'Women', image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/32145448/2024/12/31/97fe123d-cdfc-4adb-a078-a2027dfb58b01735623686402KurtaSets1.jpg' },
  { name: 'Kids', image: 'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MARCH/29/2Mni5P6h_987b545996234b9ca5adace13e6bbf2c.jpg' },
];

const Category_container = () => {
  return (
    <>
    <Breadcrumb_Container />
    <div className="category-container">
      <h2 className="category-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <div className="circle-image">
              <img src={cat.image} alt={cat.name} />
            </div>
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Category_container;
