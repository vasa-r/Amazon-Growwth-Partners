import React, { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");

      setFormData({ name: "", email: "", message: "" });
    } else {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen p-8 overflow-hidden btm-comp">
      <div className="max-w-3xl p-10 mx-auto overflow-hidden rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">Contact Us</h1>

        {successMessage && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
          <p className="mt-2 text-lg text-gray-700">
            You can also reach me at:
          </p>
          <ul className="mt-2">
            <li>Email: vasaitout@gmail.com</li>
            <li>Phone: +91 9150502819 </li>
          </ul>
          <p className="mt-2 text-lg text-gray-700">
            I forward to hearing from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
