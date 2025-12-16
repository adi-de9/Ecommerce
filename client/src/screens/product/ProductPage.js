import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, getAllProducts } from '../../features/productSlice';
import { getAllCategory } from '../../features/categorySlice';
import { getAllColor } from '../../features/colorSlice';
import ProductCard from './ProductCards';
import Pagination from './Pagination';
import Spinner from '../../components/Spinner';
import { useSearchParams, Link } from 'react-router';
import {
  MobileFiltersDialog,
  ProductFilters,
  SortAndViewOptions,
} from './ProductFilters';
import { FaHome, FaSearch } from 'react-icons/fa';
import { HiShoppingBag } from 'react-icons/hi';

function ProductPage() {
  const dispatch = useDispatch();
  const { filterProduct, products, loading } = useSelector(
    (state) => state.product
  );
  const { category } = useSelector((state) => state.category);
  const { colors } = useSelector((state) => state.color);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [formState, setFormState] = useState([]);
  const [selectedSort, setSelectedSort] = useState('low_to_high');
  const [page, setPage] = useState(1);
  const [isCallFilterData, setIsCallFilterData] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = 3;

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllColor());
  }, [dispatch]);

  useEffect(() => {
    const size = searchParams.get('size');
    const categoryId = searchParams.get('categoryId');
    const colorId = searchParams.get('colorId');
    const sortBy = searchParams.get('sortBy');

    const filterData = {
      categoryId: categoryId ? categoryId.split(',') : [],
      colorId: colorId ? colorId.split(',') : '',
      size: size ? size.split(',') : '',
      sortBy: sortBy || '',
    };
    if (size || categoryId || colorId || sortBy) {
      setIsCallFilterData(true);
      dispatch(filterProducts({ filterData }));
    } else {
      setIsCallFilterData(false);
      dispatch(getAllProducts({ page }));
    }

    console.log(filterData);
  }, [dispatch, page, selectedSort, searchParams]);

  useEffect(() => {
    const size = searchParams.get('size');
    const categoryId = searchParams.get('categoryId');
    const colorId = searchParams.get('colorId');

    const updatedFilters = [];

    if (colors) {
      updatedFilters.push({
        id: 'color',
        name: 'Color',
        options: colors.map((item) => ({
          key: item._id,
          value: item._id,
          label: item.name,
          checked: colorId ? colorId.split(',').includes(item._id) : false,
        })),
      });
    }
    if (category) {
      updatedFilters.push({
        id: 'category',
        name: 'Category',
        options: category.map((item) => ({
          key: item._id,
          value: item._id,
          label: item.name,
          checked: categoryId
            ? categoryId.split(',').includes(item._id)
            : false,
        })),
      });
    }

    updatedFilters.push({
      id: 'size',
      name: 'Size',
      options: [
        {
          value: 'X',
          label: 'X',
          checked: size ? size.split(',').includes('X') : false,
        },
        {
          value: 'XL',
          label: 'XL',
          checked: size ? size.split(',').includes('XL') : false,
        },
        {
          value: 'S',
          label: 'S',
          checked: size ? size.split(',').includes('S') : false,
        },
        {
          value: 'M',
          label: 'M',
          checked: size ? size.split(',').includes('M') : false,
        },
        {
          value: 'L',
          label: 'L',
          checked: size ? size.split(',').includes('L') : false,
        },
      ],
    });

    setFormState(updatedFilters);
  }, [colors, category, searchParams]);

  const handleSortClick = (value) => {
    setSelectedSort(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCallFilterData(true);

    const formData = new FormData(event.target);
    const selectedFilters = formState.reduce((acc, section) => {
      acc[section.id] = formData.getAll(`${section.id}[]`);
      return acc;
    }, {});

    const filterData = {
      page: page,
      ...(selectedFilters.category && { categoryId: selectedFilters.category }),
      ...(selectedFilters.color && {
        colorId: selectedFilters.color.join(','),
      }),
      ...(selectedFilters.size && { size: selectedFilters.size.join(',') }),
      sortBy: selectedSort,
    };

    setSearchParams({
      page: page,
      ...(selectedFilters.category && {
        categoryId: selectedFilters.category.join(','),
      }),
      ...(selectedFilters.color && {
        colorId: selectedFilters.color.join(','),
      }),
      ...(selectedFilters.size && { size: selectedFilters.size.join(',') }),
      sortBy: selectedSort,
    });
    console.log(filterData);
    dispatch(filterProducts({ filterData }));
  };

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      if (selectedSort === 'low_to_high') {
        return a.price - b.price;
      } else if (selectedSort === 'high_to_low') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  };

  // Check for active filters
  const hasActiveFilters =
    searchParams.get('size') ||
    searchParams.get('categoryId') ||
    searchParams.get('colorId');

  // Get product list and count
  const displayProducts = isCallFilterData ? filterProduct : products;
  const productCount = displayProducts?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 to-white">
      <MobileFiltersDialog
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        formState={formState}
        handleSubmit={handleSubmit}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
          <span className="font-medium text-primary-900">All Products</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display mb-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl lg:text-5xl">
              All Products
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              {loading ? (
                'Loading products...'
              ) : (
                <>
                  {productCount} {productCount === 1 ? 'product' : 'products'}{' '}
                  {hasActiveFilters && 'found'}
                </>
              )}
            </p>
          </div>

          <SortAndViewOptions
            handleSortClick={handleSortClick}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        </div>

        {/* Content */}
        <section aria-labelledby="products-heading">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <ProductFilters formState={formState} handleSubmit={handleSubmit} />

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                /* Loading State */
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-sm text-gray-600">
                      Loading products...
                    </p>
                  </div>
                </div>
              ) : displayProducts && displayProducts.length > 0 ? (
                /* Products Grid */
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                    {sortProducts(displayProducts).map((product, index) => (
                      <div
                        key={product._id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <ProductCard sdata={product} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && !isCallFilterData && (
                    <div className="mt-12 flex justify-center">
                      <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div className="flex min-h-[60vh] items-center justify-center">
                  <div className="text-center">
                    <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 sm:h-32 sm:w-32">
                      {hasActiveFilters ? (
                        <FaSearch className="text-4xl text-gray-400 sm:text-5xl" />
                      ) : (
                        <HiShoppingBag className="text-4xl text-gray-400 sm:text-5xl" />
                      )}
                    </div>
                    <h2 className="font-display mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {hasActiveFilters
                        ? 'No Products Found'
                        : 'No Products Available'}
                    </h2>
                    <p className="mb-6 text-base text-gray-600 sm:text-lg">
                      {hasActiveFilters
                        ? "Try adjusting your filters to find what you're looking for"
                        : 'No products are currently available'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          setSearchParams({});
                          setIsCallFilterData(false);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-800 hover:shadow-xl"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductPage;

