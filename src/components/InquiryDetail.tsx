import { useState, ChangeEvent } from "react";

interface Inquiry {
  name: string;
  email: string;
  message: string;
}

interface InquiryDetailProps {
  inquiry?: Inquiry;
}

const InquiryDetail = ({ inquiry }: InquiryDetailProps) => {
  const [response, setResponse] = useState<string>("");

  const handleResponseChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSendResponse = () => {
    if (inquiry) {
      // Logic to send response (e.g., send email)
      console.log(`Responding to ${inquiry.email} with message: ${response}`);
      // Clear the response after sending
      setResponse("");
    }
  };

  if (!inquiry) return null;

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Inquiry from {inquiry.name}</h2>
      <p className="mb-4">
        <strong>Email:</strong> {inquiry.email}
      </p>
      <p className="mb-4">
        <strong>Message:</strong> {inquiry.message}
      </p>
      <div className="mb-4">
        <textarea
          value={response}
          onChange={handleResponseChange}
          placeholder="Type your response here..."
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
          rows={4}
        />
      </div>
      <button
        onClick={handleSendResponse}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Send Response
      </button>
    </div>
  );
};

export default InquiryDetail;
