import { useState, useEffect } from "react";
import GymPanel from "../components/Gympanel";
import SearchIcon from "../assets/icons/search-icon.svg";
import EditIcon from "../assets/icons/edit-icon.svg"; // Assuming you have an edit icon
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm"; // Form to add/edit products

const ShopPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [isFormOpen, setIsFormOpen] = useState<any>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    // Simulated fetch for product data (replace with actual API call)
    const fetchProducts = async () => {
      const data = [
        {
          id: 1,
          name: "Protein Supplement",
          price: "$40",
          description: "High-quality whey protein supplement.",
          image:
            "https://imgs.search.brave.com/zrXZBmsdWjk_Z5FiAPf5hfgo7PHTe4-MAZWmrFNZUys/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFPQVRIY0tBdlMu/anBn",
        },
        {
          id: 2,
          name: "Weightlifting Belt",
          price: "$30",
          description: "Durable weightlifting belt for back support.",
          image:
            "https://imgs.search.brave.com/NDsfsf2EGr61RNdxfv5DBVG7rQ7pcLYPBK-3WO8LGIY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL3ZhZGVyLXBy/b2QuczMuYW1hem9u/YXdzLmNvbS8xNjc1/MzU4OTk4LTQxcW9T/Z3hycXFMLl9TTDUw/MF8uanBnP2Nyb3A9/MXh3OjF4aDtjZW50/ZXIsdG9wJnJlc2l6/ZT05ODA6Kg",
        },
        {
          id: 3,
          name: "Hand Guards",
          price: "$15",
          description: "Protective hand guards for weightlifting.",
          image:
            "https://imgs.search.brave.com/2P0BHSKFnGa_zNzj7zS8TPD7fWlLyPFjD0s4sPEZrp8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFEWlBoNXRhUUwu/anBn",
        },
        {
          id: 4,
          name: "Training Shoes",
          price: "$60",
          description: "Comfortable and durable training shoes.",
          image:
            "https://imgs.search.brave.com/4yCzkCIDLqbvyQd4NvBRyae2dTCma13xfcOTWjcPnig/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFVNkhuOG0tb0wu/anBn",
        },
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    return products.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const openForm = (product = null) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = (updatedProduct: any = null) => {
    if (updatedProduct) {
      setProducts((prevProducts: any) => {
        if (updatedProduct.id) {
          return prevProducts.map((p: any) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
        } else {
          return [
            ...prevProducts,
            { ...updatedProduct, id: prevProducts.length + 1 },
          ];
        }
      });
    }
    setSelectedProduct(null);
    setIsFormOpen(false);
  };

  return (
    <GymPanel>
      <div className="p-6">
        <Modal
          isOpen={isFormOpen}
          onClose={() => closeForm()}
          title={selectedProduct ? "Edit Product" : "Add Product"}
        >
          <ProductForm product={selectedProduct} onSubmit={closeForm} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Shop</h1>
          <button
            onClick={() => openForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterProducts().map((product: any) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 -z-5"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-4 rounded-t-lg"
                />
              )}

              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-400">Price: {product.price}</p>
                  <p className="text-gray-400">{product.description}</p>
                </div>
                <div className="">
                  <img
                    src={EditIcon}
                    alt="Edit Icon"
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => openForm(product)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default ShopPage;
