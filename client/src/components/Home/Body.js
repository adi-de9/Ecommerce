import Shimmer from '../Loading/Shimmer.js';
import { useEffect } from 'react';
import Carousel from './Carousel.js';
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice.js';
import { useSelector } from 'react-redux';
import { getCartProducts } from '../../features/cartSlice.js';
import CategoryCard from '../../screens/category/CategoryCard.js';
import { getWishListProducts } from '../../features/wishlistSlice.js';
import Button from '../Button.js';
import { useNavigate } from 'react-router';
import ProductCard from '../../screens/product/ProductCards.js';
import { getAllProducts } from '../../features/productSlice.js';
import img1 from '../../../images/truck.webp';
import img2 from '../../../images/ruppe.webp';
import img3 from '../../../images/box.png';
import img4 from '../../../images/clothBanner3.avif';
import img5 from '../../../images/clothBanner4.avif';
import img6 from '../../../images/banner1.jpg';
import img7 from '../../../images/banner2.jpg';
import img8 from '../../../images/banner3.jpg';

import { refreshToken } from '../../features/authSlice.js';
import HomeBanner from './HomeBanner.js';

const Body = () => {
  const { category } = useSelector((state) => state.category);

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slidesImg = [
    { img: img6, Category: 'New Arrival', text: 'MEN CLOTHS', href: '#' },
    { img: img7, Category: 'New Arrival', text: 'AUTOMAN OVER ', href: '#' },
    { img: img8, Category: 'New Arrival', text: 'MEN GLASSER', href: '#' },
  ];

  const slidesText = [
    {
      textData:
        "Best purchase I've made this winter! The color and knitting are exquisite and it's so comfy! Went from NYC to Miami without ever taking it off. Super cute!!",
    },
    {
      textData:
        "This winter's best purchase! The color and knitting are exquisite, and it's incredibly comfy! Traveled from NYC to Miami without ever taking it off. Super cute!",
    },
    {
      textData:
        "My top winter buy! The color and knitting are exquisite, and it's unbelievably comfy! Went from NYC to Miami without taking it off once. Absolutely adorable!!",
    },
  ];

  const { isUserVerified, isUserLogin } = useSelector((state) => state.auth);

  const { wishlistProducts } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isUserLogin) {
      if (wishlistProducts.length === 0) {
        dispatch(getWishListProducts());
      }
      dispatch(getCartProducts());
    }
    dispatch(getAllCategory());
    dispatch(getAllProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(refreshToken());
    }
  }, [isUserLogin]);

  return category?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body mb-24">
      <div>
        <div className="">
          {isUserVerified === false ? (
            <p className="bg-gradient-to-r from-primary-900 to-primary-800 py-3.5 text-center text-sm font-medium text-white">
              <span className="mr-2 cursor-pointer underline decoration-white/50 underline-offset-4 transition-all hover:decoration-white">
                click here
              </span>
              please verify your account. A verification link already sent to
              your email address
            </p>
          ) : (
            ''
          )}
          <HomeBanner slides={slidesImg} />
        </div>

        {/* Category Section */}
        <section className="px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="font-display mb-4 text-5xl font-bold tracking-tight text-primary-900 md:text-6xl lg:text-7xl">
                Shop by Category
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                Discover our curated collections designed for your lifestyle
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {category?.slice(0, 4).map((category, index) => (
                <div
                  key={index}
                  className="animate-fadeInUp transition-smooth"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CategoryCard sdata={category} />
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Button
                title="View All Categories"
                bgColor="transparent"
                textColer="black"
                className="transition-smooth group h-14 rounded-full border-2 border-primary-900 px-10 text-base font-semibold tracking-wide text-primary-900 hover:bg-primary-900 hover:text-white"
                onClick={() => navigate('./category')}
              />
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-accent">
                New Arrivals
              </span>
              <h2 className="font-display mb-4 text-5xl font-bold tracking-tight text-primary-900 md:text-6xl lg:text-7xl">
                Latest Collection
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                Explore our newest additions and trending styles
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products?.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard sdata={product} />
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Button
                title="Explore All Products"
                bgColor="tranparent"
                textColer="black"
                className="transition-smooth h-14 rounded-full border-2 border-primary-900 px-10 text-base font-semibold tracking-wide text-primary-900 hover:bg-primary-900 hover:text-white"
                onClick={() => navigate('./products')}
              />
            </div>
          </div>
        </section>

        {/* Features / Details Section */}
        <section className="px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3">
            <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group flex items-start gap-5 rounded-2xl bg-white p-8">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <img
                  src={img1}
                  alt="Free Shipping"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary-900">
                  Free Shipping
                </h3>
                <p className="leading-relaxed text-gray-600">
                  All orders of ₹499 or more of eligible items across any
                  product category qualify.
                </p>
              </div>
            </div>
            <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group flex items-start gap-5 rounded-2xl bg-white p-8">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <img
                  src={img2}
                  alt="Secure Payment"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary-900">
                  Secure Payment
                </h3>
                <p className="leading-relaxed text-gray-600">
                  We accept Visa, American Express, Mastercard, and Discover for
                  secure transactions.
                </p>
              </div>
            </div>
            <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group flex items-start gap-5 rounded-2xl bg-white p-8">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <img
                  src={img3}
                  alt="Easy Returns"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary-900">
                  Easy Returns
                </h3>
                <p className="leading-relaxed text-gray-600">
                  You can return your online order within 30 days of receiving
                  your order hassle-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shop The Look Banner */}
        <section className="bg-gradient-to-b from-white to-primary-50 px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="font-display mb-4 text-5xl font-bold tracking-tight text-primary-900 md:text-6xl lg:text-7xl">
                Shop The Look
              </h2>
              <p className="text-xl font-medium tracking-wide text-gray-600">
                Trending Outfits for Men
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group overflow-hidden rounded-3xl bg-white">
                <div className="overflow-hidden">
                  <img
                    src={img4}
                    alt="Trending Outfit 1"
                    className="h-[500px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group overflow-hidden rounded-3xl bg-white">
                <div className="overflow-hidden">
                  <img
                    src={img5}
                    alt="Trending Outfit 2"
                    className="h-[500px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="shadow-elegant transition-smooth hover:shadow-elegant-hover group overflow-hidden rounded-3xl bg-white">
                <div className="overflow-hidden">
                  <img
                    src={img4}
                    alt="Trending Outfit 3"
                    className="h-[500px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-display mb-4 text-4xl font-bold tracking-tight text-primary-900 md:text-5xl">
                What Our Customers Say
              </h2>
            </div>
            <Carousel slides={slidesText} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Body;
