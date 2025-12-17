import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import ImagePreview from '../Utils/ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  addProduct,
  getOneProduct,
  updateProduct,
} from '../../../features/productSlice';
import { getAllCategory, addCategory } from '../../../features/categorySlice';
import { getAllColor, addColor } from '../../../features/colorSlice';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

function ProductEditDetails({ id, edit }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    size: '',
    price: '',
    stock: '',
    mainImage: null,
    mainImageName: '',
    category: '',
    color: '',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const { singleProduct, SuccessMsg, error } = useSelector(
    (state) => state.product
  );
  const { category } = useSelector((state) => state.category);
  const { colors } = useSelector((state) => state.color);

  const [showNewColor, setShowNewColor] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllColor());
    dispatch(getAllCategory());
    if (id !== 'new') {
      dispatch(getOneProduct({ productId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id !== 'new' && edit == 'true') {
      if (singleProduct) {
        setProductData({
          name: singleProduct?.name,
          description: singleProduct?.description,
          size: singleProduct?.size.join(', '),
          price: singleProduct?.price,
          stock: singleProduct?.stock,
          mainImage: singleProduct?.mainImage,
          mainImageName: singleProduct.mainImage?.public_id,
          category: singleProduct?.category,
          color: singleProduct?.color,
        });

        try {
          const contentState = convertFromRaw(
            JSON.parse(singleProduct.description)
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        } catch (error) {
          setEditorState(() => EditorState.createEmpty());
        }
      }
    }
  }, [singleProduct]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'mainImage' && files && files.length > 0) {
      const file = files[0];
      setProductData((prevData) => ({
        ...prevData,
        mainImage: file,
        mainImageName: file.name,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      dispatch(updateProduct({ productData, id }));
      if (SuccessMsg !== null) {
        toast.success(SuccessMsg);
        navigate('./');
      }
      toast.error(error);
    }

    if (id == 'new' && edit == 'true') {
      dispatch(addProduct({ productData }));
      toast.success('Product added successfully');
      navigate('./');
    }
  };

  const handleClearImage = () => {
    setProductData((prevData) => ({
      ...prevData,
      mainImage: null,
      mainImageName: '',
    }));
    setImagePreview(null);
    setIsPreviewVisible(false);
  };

  const inputFields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Product Name',
    },
    {
      id: 'description',
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Product Description',
      defaultValue: 'description',
    },
    {
      id: 'size',
      name: 'size',
      type: 'text',
      label: 'Size - (S, M, XL)',
      placeholder: 'Product Size',
    },
    {
      id: 'price',
      name: 'price',
      type: 'number',
      label: 'Price',
      placeholder: 'Product Price',
    },
    {
      id: 'stock',
      name: 'stock',
      type: 'number',
      label: 'Stock',
      placeholder: 'Product Stock',
    },
  ];

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    setProductData((prevProductData) => ({
      ...prevProductData,
      description: JSON.stringify(rawContentState),
    }));
  };

  return (
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          {inputFields.map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label htmlFor={field.id} className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
              {field.type === 'textarea' ? (
                <div className="min-h-52 rounded-md border border-gray-300 bg-white px-2 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'list',
                        'textAlign',
                        'link',
                        'history',
                      ],
                      inline: {
                        options: ['bold', 'italic', 'underline'],
                      },
                      blockType: {
                        options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
                      },
                    }}
                  />
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="h-10 rounded-md border border-gray-300 bg-white px-2 py-2 text-base text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
                  value={productData[field.name] || ''}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
          <div className="flex w-full flex-col">
            <label htmlFor="mainImage" className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Main Image</label>
            {!productData.mainImage ? (
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                placeholder="Product Main Image"
                className="flex h-10 w-full items-center justify-start rounded-md border border-gray-300 bg-white px-2 py-2 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                onChange={handleInputChange}
              />
            ) : (
              <div className="flex h-10 w-full items-center justify-center rounded-md bg-gray-50 px-2 dark:bg-gray-800">
                {(productData.mainImage?.secure_url || imagePreview) && (
                  <img
                    src={productData.mainImage?.secure_url || imagePreview}
                    alt="Thumbnail"
                    className="mr-2 h-8 w-8 rounded object-cover"
                  />
                )}
                <h1 className="w-full text-gray-900 dark:text-white">
                  {productData.mainImage.public_id
                    ? productData.mainImage.public_id
                    : productData.mainImageName}
                </h1>
                <div
                  onClick={handleClearImage}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Clear
                </div>
                <div
                  onClick={() => setIsPreviewVisible(true)}
                  className="flex h-full w-20 cursor-pointer items-center justify-center rounded-md bg-gray-800 text-white hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  View
                </div>
              </div>
            )}
            {isPreviewVisible && (
              <ImagePreview
                image={
                  productData.mainImage.secure_url
                    ? productData.mainImage.secure_url
                    : imagePreview
                }
                onClose={() => setIsPreviewVisible(false)}
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                id="category"
                name="category"
                className="h-10 rounded-md border border-gray-300 bg-white px-2 py-2 text-base text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                {category?.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-2">
                {!showNewCategory ? (
                  <button
                    type="button"
                    onClick={() => setShowNewCategory(true)}
                    className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    + Add category
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="New category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="h-8 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <input
                      type="file"
                      id="categoryImage"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setNewCategoryImage(e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="categoryImage"
                      className="flex h-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {newCategoryImage ? 'Image Selected' : 'Choose Image'}
                    </label>
                    {newCategoryImage && (
                      <img
                        src={URL.createObjectURL(newCategoryImage)}
                        alt="Preview"
                        className="h-8 w-8 rounded object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        if (!newCategoryName.trim()) {
                          toast.error('Enter a category name');
                          return;
                        }
                        const formData = new FormData();
                        formData.append('name', newCategoryName.trim());
                        if (newCategoryImage) {
                          formData.append('image', newCategoryImage);
                        }

                        try {
                          await dispatch(addCategory({ categoryData: formData }));
                          await dispatch(getAllCategory());
                          toast.success('Category added');
                          setNewCategoryName('');
                          setNewCategoryImage(null);
                          setShowNewCategory(false);
                        } catch (err) {
                          toast.error('Failed to add category');
                        }
                      }}
                      className="rounded-md bg-green-500 px-3 py-1 text-sm text-white shadow-sm hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategory(false);
                        setNewCategoryName('');
                        setNewCategoryImage(null);
                      }}
                      className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Color Choose */}
            <div className="flex w-1/2 flex-col">
              <label htmlFor="color" className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <select
                id="color"
                name="color"
                className="h-10 rounded-md border border-gray-300 bg-white px-2 py-2 text-base text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
                value={productData.color}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select color
                </option>
                {colors &&
                  colors.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <div className="mt-2 flex items-center gap-2">
                {!showNewColor ? (
                  <button
                    type="button"
                    onClick={() => setShowNewColor(true)}
                    className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    + Add color
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="New color name"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      className="h-8 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded-md border border-gray-300 p-0 text-sm dark:border-gray-600"
                    />
                    <input
                      type="text"
                      placeholder="#000000"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="h-8 w-24 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (!newColorName.trim()) {
                          toast.error('Enter a color name');
                          return;
                        }
                        const colorData = {
                          name: newColorName.trim(),
                          hexCode: newColorHex,
                        };
                        try {
                          await dispatch(addColor({ colorData }));
                          await dispatch(getAllColor());
                          toast.success('Color added');
                          setNewColorName('');
                          setNewColorHex('#000000');
                          setShowNewColor(false);
                        } catch (err) {
                          toast.error('Failed to add color');
                        }
                      }}
                      className="rounded-md bg-green-500 px-3 py-1 text-sm text-white shadow-sm hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewColor(false);
                        setNewColorName('');
                        setNewColorHex('#000000');
                      }}
                      className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="my-5 flex items-center justify-start gap-x-3">
            <div className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              <Link
                to="./"
                className="flex h-full w-full items-center justify-center text-gray-700 dark:text-gray-300"
              >
                Cancel
              </Link>
            </div>
            <button
              type="submit"
              className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 text-white shadow-md transition-all hover:border-gray-700 hover:bg-gray-700 dark:border-blue-600 dark:bg-blue-600 dark:hover:border-blue-700 dark:hover:bg-blue-700"
            >
              {edit ? 'Publish' : 'Edit'}
            </button>
          </div>
        </form>
      </div>

  );
}

export default ProductEditDetails;
