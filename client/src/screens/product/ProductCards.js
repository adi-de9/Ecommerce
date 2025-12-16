import { Link } from 'react-router';
import WishlistBtn from '../BAG/WishlistBtn';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProductCard = ({ sdata }) => {
  const name = sdata?.name;
  const price = sdata?.price;
  const _id = sdata?._id;
  const mainImage = sdata?.mainImage;
  const { isUserLogin } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  const oldPrice = price ? price + 278 : null;
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-elegant hover:shadow-elegant-hover group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300"
    >
      <Link to={`/singleProduct/${_id}`} className="flex h-full flex-col">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          <img
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            alt={name}
            loading="lazy"
            src={mainImage?.url}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg sm:left-3 sm:top-3 sm:px-3 sm:py-1.5">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button - Always visible on mobile/tablet, hover on desktop */}
          <div
            className={`absolute right-2 top-2 transition-all duration-300 sm:right-3 sm:top-3 lg:${
              isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            } opacity-100 lg:opacity-0`}
          >
            <WishlistBtn id={_id} isUserLogin={isUserLogin} />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
          {/* Product Name */}
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-primary-900 transition-colors group-hover:text-accent sm:text-base">
            {name}
          </h3>

          {/* Spacer to push price to bottom */}
          <div className="flex-1"></div>

          {/* Price Section */}
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2.5">
            <span className="text-lg font-bold text-primary-900 sm:text-xl">
              ₹{price?.toLocaleString('en-IN')}
            </span>
            {oldPrice && (
              <>
                <span className="text-xs font-medium text-gray-400 line-through sm:text-sm">
                  ₹{oldPrice.toLocaleString('en-IN')}
                </span>
              </>
            )}
          </div>

          {/* Quick View Button - Always visible on mobile, appears on hover for desktop */}
          <div
            className={`mt-1 transition-all duration-300 lg:${
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0 lg:pointer-events-none'
            } translate-y-0 opacity-100`}
          >
            <div className="flex w-full items-center justify-center rounded-lg bg-primary-900 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-800 sm:py-2.5 sm:text-sm">
              Quick View
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
