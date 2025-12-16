import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlistSlice';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function WishlistBtn({ id, mode, isUserLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalWishProductsId } = useSelector((state) => state.wishlist);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (totalWishProductsId.includes(id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [totalWishProductsId]);

  const handleAddWishLit = () => {
    dispatch(addToWishlist({ id }));
    toast.success('Added to Wishlist', {
      autoClose: 500,
    });
    setAdded(true);
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist({ id }));
    toast.success('Removed from Wishlist', {
      autoClose: 500,
    });
    setAdded(false);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isUserLogin) {
      added ? handleRemove() : handleAddWishLit();
    } else {
      navigate('/login');
    }
  };

  let style;
  if (mode && mode == 'normal') {
    style = 'rounded-md mx-2';
  } else {
    style = 'absolute right-2 top-2 rounded-full';
  }

  return (
    <div
      onClick={handleOnClick}
      className={`${style} group/wishlist flex h-10 w-10 cursor-pointer items-center justify-center bg-white/90 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg`}
    >
      {added ? (
        <FaHeart className="text-red-500 transition-transform group-hover/wishlist:scale-110" />
      ) : (
        <FaRegHeart className="text-primary-900 transition-transform group-hover/wishlist:scale-110" />
      )}
    </div>
  );
}

export default WishlistBtn;
