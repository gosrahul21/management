import { useState } from 'react';
import { createGym } from '../service/gym/gymService';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../service/upload/imageUpload';
import { enqueueSnackbar } from 'notistack';

const GymForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let image = null;
    if (imageFile) {
      try {
        const uploadResponse = await uploadImage(imageFile);
        image = uploadResponse._id; // Assuming your API returns the URL of the uploaded image
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error response
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
      image, // Include the image URL in the gym data
    };

    try {
      const response = await createGym(newGym);
      enqueueSnackbar('Gym created successfully',{variant: 'success'})
      navigate('/');
      // Reset form fields or handle success response
    } catch (error) {
      console.error('Error creating gym:', error);
      // Handle error response
    }
  };

  const handleFacilitiesChange = (e) => {
    const facilitiesArray = e.target.value.split(',').map((item: string) => item.trim());
    setFacilities(facilitiesArray);
  };

  const onDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles[0])
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

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
        value={facilities.join(', ')}
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
