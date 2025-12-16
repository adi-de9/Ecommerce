import { Link } from 'react-router';
import BagProduct from './BagProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '../../features/cartSlice';
import { VscLoading } from 'react-icons/vsc';
import { FaShoppingBag, FaHome, FaArrowRight } from 'react-icons/fa';
import { HiShoppingBag } from 'react-icons/hi';

const Bag = () => {
  const { cartProducts, cartTotalPrice, updateCart, isLoading } = useSelector(
    (state) => state.cart
  );
console.log(cartProducts);
  const { isUserLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getCartProducts());
    }
  }, [dispatch, updateCart]);

  const itemCount = cartProducts?.length || 0;

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
          <span className="font-medium text-primary-900">Shopping Bag</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center justify-center gap-3">
            <div className="to-primary-700 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-900 shadow-lg sm:h-14 sm:w-14">
              <FaShoppingBag className="text-xl text-white sm:text-2xl" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl lg:text-5xl">
              Shopping Bag
            </h1>
          </div>

          {itemCount > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-900/10 px-4 py-2">
                <span className="text-sm font-semibold text-primary-900">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        {itemCount === 0 ? (
          /* Empty State */
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 sm:h-32 sm:w-32">
                <HiShoppingBag className="text-4xl text-gray-400 sm:text-5xl" />
              </div>
              <h2 className="font-display mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Your Bag is Empty
              </h2>
              <p className="mb-8 text-base text-gray-600 sm:text-lg">
                Add items to your bag to get started
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-800 hover:shadow-xl sm:px-10 sm:py-4 sm:text-base"
              >
                Start Shopping
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        ) : (
          /* Bag Content */
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="shadow-elegant rounded-2xl bg-white p-4 sm:p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-bold text-primary-900 sm:text-xl">
                      Items in Your Bag
                    </h3>
                    <span className="text-sm text-gray-600">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cartProducts.map((data, index) => (
                      <BagProduct
                        key={index}
                        mainImage={data?.product?.mainImage}
                        price={data?.product?.price}
                        name={data?.product?.name}
                        _id={data?.product?._id}
                        preQuantity={data?.quantity}
                        size={data?.size || 'M'}
                        colorName={data?.color?.name}
                        colorHex={data?.color?.hexCode}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>

                {/* Continue Shopping Link */}
                <Link
                  to="/products"
                  className="hover:text-primary-700 group inline-flex items-center gap-2 text-sm font-medium text-primary-900 transition-colors"
                >
                  <span>← Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary - Sticky on Desktop */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="shadow-elegant rounded-2xl bg-white p-6">
                <h3 className="mb-6 text-xl font-bold text-primary-900">
                  Order Summary
                </h3>

                {/* Summary Details */}
                <div className="space-y-4 border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-base font-semibold text-gray-900">
                      ₹{cartTotalPrice?.toFixed(0) || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium text-green-600">
                      Free
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="my-6 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-900">
                    Total
                  </span>
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <VscLoading className="animate-spin text-xl text-primary-900" />
                    ) : (
                      <span className="text-2xl font-bold text-primary-900">
                        ₹{cartTotalPrice?.toFixed(0) || 0}
                      </span>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/placeOrder/payment" className="block">
                  <button
                    disabled={itemCount === 0}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-primary-900 to-primary-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="to-primary-700 absolute inset-0 bg-gradient-to-r from-primary-800 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Easy 30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bag;

