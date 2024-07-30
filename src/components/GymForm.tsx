import { useState, ChangeEvent, FormEvent } from "react";
import { createGym } from "../service/gym/gymService";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../service/upload/imageUpload";
import { enqueueSnackbar } from "notistack";

const GymForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [facilities, setFacilities] = useState<string[]>([]);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let image = null;
    if (imageFile) {
      try {
        const uploadResponse = await uploadImage(imageFile);
        image = uploadResponse._id; // Assuming your API returns the ID of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        enqueueSnackbar("Error uploading image", { variant: "error" });
        return;
      }
    }

    const newGym = {
      name,
      address,
      city,
      pincode,
      state,
      country,
      facilities,
      contactInfo: {
        phone,
        email,
      },
      image, // Include the image ID in the gym data
    };

    try {
      await createGym(newGym);
      enqueueSnackbar("Gym created successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error creating gym:", error);
      enqueueSnackbar("Error creating gym", { variant: "error" });
    }
  };

  const handleFacilitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const facilitiesArray = e.target.value
      .split(",")
      .map((item: string) => item.trim());
    setFacilities(facilitiesArray);
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  } as any);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow-md text-white"
    >
      <h2 className="text-2xl mb-4">Create Gym</h2>
      <label className="block mb-2">Gym Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <label className="block mb-2">Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            required
          />
        </div>
      </div>
      <label className="block mb-2">Facilities (comma-separated)</label>
      <input
        type="text"
        value={facilities.join(", ")}
        onChange={handleFacilitiesChange}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
      />
      <label className="block mb-2">Contact Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <label className="block mb-2">Contact Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />

      <div
        {...getRootProps()}
        className="w-full p-6 bg-gray-700 border border-gray-600 rounded mb-4 text-white text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-full h-48 object-cover rounded mb-4"
          />
        ) : (
          <p>Drag and drop an image, or click to select one</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded bg-purple-600 hover:bg-purple-700"
      >
        Create Gym
      </button>
    </form>
  );
};

export default GymForm;
