// SubscriptionForm.tsx
import { useState, useEffect } from "react";
import Input from "../widgets/Input"; // Assume you have an Input component
import { Spinner } from "../widgets/Spinner"; // Assume you have a Spinner component
import { useGym } from "../context/GymContext";
import { getGroups } from "../service/group/groupService";
import { User } from "../pages/users/types/User";
import getSubscriptionPlans from "../service/subscription-plan/getSubscriptionPlan";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../service/upload/imageUpload";
import SubscriptionPlan from "../service/subscription-plan/types/SubscriptionPlan";
import Group from "../pages/group/types/Group";

interface SubscriptionFormProps {
  onAddSubscriberClick: (user: any) => void;
}

const SubscriptionForm = ({ onAddSubscriberClick }: SubscriptionFormProps) => {
  const [_plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [_groups, setGroups] = useState<Group[]>([]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [user, _setUser] = useState<User | null>(null);
  const [addingUser, setAddingUser] = useState<boolean>(false);
  const { gym } = useGym();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setImageFile(acceptedFiles[0]);
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  } as any);

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
  }, [gym._id]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUser(true);
    try {
      let image = null;
      if (imageFile) {
        try {
          const uploadResponse = await uploadImage(imageFile);
          image = uploadResponse._id; // Assuming your API returns the URL of the uploaded image
        } catch (error) {
          console.error("Error uploading image:", error);
          return;
        }
      }
      onAddSubscriberClick({
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
          type="submit"
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
