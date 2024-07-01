import React, { useState } from "react";
import Input from "../widgets/Input";

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      price: "",
      description: "",
      image: null,
    }
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-100 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <Input
          id="productNameId"
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-100 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <Input
          id="priceId"
          type="text"
          placeholder="price"
          value={formData.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-100 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow-md appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-100 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Product Image
        </label>
        <Input
          id="fileId"
          type="file"
          placeholder="image"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
        {console.log(typeof formData.image)}
        {formData.image &&
          (typeof formData.image === "string" ? (
            <img
              src={formData.image}
              alt="Product"
              className="mt-2 h-20 w-20 object-cover"
            />
          ) : (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Product"
              className="mt-2 h-20 w-20 object-cover"
            />
          ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {product ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
