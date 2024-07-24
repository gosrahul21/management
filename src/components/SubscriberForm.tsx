import React, { useState, useEffect } from "react";
import Input from "../widgets/Input"; // Assume you have an Input component
import { Spinner } from "../widgets/Spinner"; // Assume you have a Spinner component
import { useGym } from "../context/GymContext";
import { getGroups } from "../service/group/groupService";
import SubscriptionPlan from "../service/subscription-plan/types/SubscriptionPlan";
import Group from "../pages/group/types/Group";
import { User } from "../pages/users/types/User";
import getSubscriptionPlans from "../service/subscription-plan/getSubscriptionPlan";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../service/upload/imageUpload";

const SubscriptionForm = ({ onAddSusbcriberClick }: any) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [addingUser, setAddingUser] = useState<boolean>(false);
  const { gym } = useGym();
  const [imageFile, setImageFile] = useState(null);

  const onDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles[0]);
    setImageFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, groupsData] = await Promise.all([
          getSubscriptionPlans(gym._id),
          getGroups(gym._id),
        ]);
        setPlans(plansData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Failed to fetch plans or groups", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchUser = async () => {
    setSearching(true);
    try {
      // const userData = await searchUser(email, phoneNo);
      // setUser(userData);
    } catch (error) {
      console.error("User not found", error);
      setUser(null);
    } finally {
      setSearching(false);
    }
  };

  const handleAddUser = async () => {
    setAddingUser(true);
    try {
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
      onAddSusbcriberClick({
        email,
        phoneNo,
        name,
        gender,
        image,
      });
    } catch (error) {
      console.error("Failed to add user", error);
    } finally {
      setAddingUser(false);
    }
  };

  return (
    <form
      onSubmit={handleAddUser}
      className="bg-gray-800 p-6 rounded shadow-md text-white md:w-[30vw]"
    >
      {user && (
        <div className="mb-4">
          <label>User Email: {user.email}</label>
          <label>User Name: {user.firstName + " " + user.lastName}</label>
        </div>
      )}
      <label className="block mb-2">Email</label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
      />
      <label className="block mb-2">Phone Number</label>
      <div className="flex mb-4">
        <Input
          id="no"
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full px-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      <label className="block mb-2">Name</label>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
      />

      <label className="block mb-2">Gender</label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

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

      {!user && (
        <button
          type="button"
          onClick={handleAddUser}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={addingUser}
        >
          {addingUser ? <Spinner /> : "Add User"}
        </button>
      )}
    </form>
  );
};

export default SubscriptionForm;
