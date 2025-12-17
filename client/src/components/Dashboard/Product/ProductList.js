import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../Utils/AddButton';
import { getAllProducts } from '../../../features/productSlice';
import Pagination from '../../../screens/product/Pagination';

function ProductList() {
  const dispatch = useDispatch();
  const { products, SuccessMsg } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    dispatch(getAllProducts({ page }));
  }, [dispatch, page, SuccessMsg]);

  const filteredProducts = products
    ?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'newest')
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === 'oldest')
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <>
      <div className="w-full">
        <div className="my-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-x-4">
            <input
              type="text"
              placeholder="Search products..."
              className="h-10 w-64 rounded-md border border-gray-300 px-3 outline-none focus:border-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="h-10 rounded-md border border-gray-300 px-3 outline-none focus:border-gray-800"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
          <AddButton />
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-tl-md rounded-tr-md bg-gray-800 text-white">
          <div className="flex h-full w-10 items-center justify-center border-r px-3">
            <input className="cursor-pointer" type="checkbox" />
          </div>
          <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
            S.No
          </div>
          <div className="flex h-full w-full cursor-pointer items-center justify-start border-r px-2 text-base font-medium hover:underline">
            Name
          </div>
          <div className="flex h-full w-36 cursor-pointer items-center justify-start border-r px-2 text-base font-medium hover:underline">
            Image
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Stock
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Price
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Edit
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Setting
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Delete
          </div>
        </div>
        <div className="my-1 flex w-full flex-col items-center justify-center rounded-bl-md rounded-br-md border text-gray-800 dark:text-gray-100">
          {filteredProducts?.map((item, index) => {
            return (
              <ProductListItem
                key={index}
                id={item._id}
                index={page == 1 ? index + 1 : (page - 1) * 12 + (index + 1)}
                name={item.name}
                stock={item.stock}
                price={item.price}
                image={item.mainImage?.secure_url}
              />
            );
          })}
        </div>
        <div className="my-5 flex w-full items-center px-5">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(products?.length >= 12 ? page + 1 : page)}
            onPageChange={setPage}
            style={{
              position: 'justify-end',
              color: 'bg-gray-800',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ProductList;
