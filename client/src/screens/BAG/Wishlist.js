import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWishListProducts } from '../../features/wishlistSlice';
import ProductCard from '../product/ProductCards';
import { FaHeart, FaHome } from 'react-icons/fa';
import { Link } from 'react-router';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistProducts, totalWishProducts } = useSelector(
    (state) => state.wishlist
  );
  const { isUserLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getWishListProducts());
    }
  }, [dispatch]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-primary-50/30 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-primary-900"
          >
            <FaHome className="text-xs" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-primary-900">Wishlist</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg sm:h-14 sm:w-14">
              <FaHeart className="text-xl text-white sm:text-2xl" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl lg:text-5xl">
              Your Wishlist
            </h1>
          </div>

          {totalWishProducts > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-900/10 px-4 py-2">
                <span className="text-sm font-semibold text-primary-900">
                  {totalWishProducts}{' '}
                  {totalWishProducts === 1 ? 'Item' : 'Items'}
                </span>
              </div>
            </div>
          )}

          {totalWishProducts > 0 && (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
              Save your favorite items and shop them later
            </p>
          )}
        </div>

        {/* Content Section */}
        {totalWishProducts === 0 ? (
          /* Empty State */
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 sm:h-32 sm:w-32">
                <FaHeart className="text-4xl text-gray-400 sm:text-5xl" />
              </div>
              <h2 className="font-display mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Your Wishlist is Empty
              </h2>
              <p className="mb-8 text-base text-gray-600 sm:text-lg">
                Start adding items you love to your wishlist
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-800 hover:shadow-xl sm:px-10 sm:py-4 sm:text-base"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {wishlistProducts?.map((data, index) => (
              <div
                key={data?.product?._id || index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard sdata={data?.product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;

