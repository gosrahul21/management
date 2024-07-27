// components/EmployeeForm.js
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Spinner } from "../widgets/Spinner";
import Input from "../widgets/Input";
import { createEmployee } from "../service/employees/createEmployeeService";
import { checkUserExists } from "../service/employees/checkEmployeeExist";
import { uploadImage } from "../service/upload/imageUpload";
import { useGym } from "../context/GymContext";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [userExists, setUserExists] = useState(null); // null, true, false
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const {gym} = useGym();
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => setImageFile(acceptedFiles[0]),
  } as any);

  const employeeTypes = ["Trainer", "Admin", "Cleaner"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const exists = await checkUserExists(name);
      // setUserExists(exists);

      // const userId = exists ? "existing_user_id" : "new_user_id"; // Replace with actual user ID logic

      // upload image first 
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

      const newEmployee = {
        // userId,
        role: employeeType,
        gymId: gym._id, // Replace with the actual gym ID
        startDate: new Date(),
        endDate: undefined,
        email,
        phoneNo,
        name,
        gender,
        image,
      };

      await createEmployee(newEmployee);
      navigate(-1);
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow-md text-white"
    >
      <h2 className="text-2xl mb-4">Add Employee</h2>

      {userExists === false && (
        <div className="mb-4 text-red-500">
          User does not exist. A new user will be created.
        </div>
      )}

      <label className="block mb-2">Email</label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />

      <label className="block mb-2">Phone Number</label>
      <Input
        id="phoneNo"
        type="text"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />

      <label className="block mb-2">Employee Type</label>
      <select
        value={employeeType}
        onChange={(e) => setEmployeeType(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
        disabled={isSubmitting}
      >
        <option value="">Select Employee Type</option>
        {employeeTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="block mb-2">Name</label>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />

      <label className="block mb-2">Gender</label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
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

      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
