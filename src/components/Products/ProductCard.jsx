import React, { memo, useContext } from 'react'
import "./ProductCard.css"

import config from '../../config.json'
// import cactusjack from "../../assets/cactusjack.webp"
import star from "../../assets/white-star.png"
import basket from "../../assets/basket.png"
import { NavLink } from 'react-router-dom'
import cartContext from '../../contexts/CartContext'
import userContext from '../../contexts/UserContext'

const ProductCard = ({
    // id, 
    // image,
    //  price,
    //   title, 
    //   rating, 
    //   ratingCounts,
    //  stock,//
    // we also pass the single product component as well. which is
    product
    }) => {
       const {addToCart} = useContext(cartContext);
      const user = useContext(userContext)
  return (
    <article className='product_card'><div className='product_image'>
        <NavLink to={`/products/${product?._id}`}><img src={`${config.backendURL}/products/${product?.images[0]}`} alt="Product image" /></NavLink>
        </div>

        <div className="product_details">
            <h3 className='product_price'>
             ${product?.price}
            </h3>
            <p className="product_title">{product?.title}</p>

            <footer className="align_center product_info_footer">
                <div className="align_center">
                    <p className='align_center product_rating'>
                        <img src={star} alt="Star" /> {product?.reviews.rate}
                    </p>
                    <p className='product_review_count'>{product?.reviews.counts}</p>
                </div>
                {product?.stock > 0 && user && (<button className='add_to_cart' onClick={() => addToCart(product, 1)}>
                    <img src={basket} alt="basket button" />
                </button>
                )}
            </footer>
        </div>
        </article>
  )
}

export default memo(ProductCard)
