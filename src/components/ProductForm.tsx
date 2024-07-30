import { useState, ChangeEvent, FormEvent } from "react";
import Input from "../widgets/Input";

interface Product {
  name: string;
  price: string;
  description: string;
  image: File | null;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Product) => void;
}

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>(
    product || { name: "", price: "", description: "", image: null }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files }: any = e.target;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          name="name"
          type="text"
          placeholder="Name"
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
          name="price"
          type="text"
          placeholder="Price"
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
          rows={4}
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
          name="image"
          type="file"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Product"
            className="mt-2 h-20 w-20 object-cover"
          />
        )}
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
