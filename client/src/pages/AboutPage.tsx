import React from "react";

const AboutPage = () => {
  return (
    <div className="p-8 btm-comp">
      <div className="p-10 mx-auto rounded-lg shadow-lg max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">About Us</h1>

        <p className="mb-4 text-lg text-gray-700">
          Welcome to <strong>Shoppy</strong>, your go-to destination for all
          your shopping needs. Our mission is to provide an enjoyable shopping
          experience by offering a diverse range of high-quality products at
          competitive prices.
        </p>

        <p className="mb-4 text-lg text-gray-700">
          Founded in 2024 with a passion for online shopping, we have grown to
          become a trusted platform for customers around the world. Our
          dedicated team works tirelessly to curate the best selection of
          products that cater to every style and budget.
        </p>

        <p className="mb-4 text-lg text-gray-700">
          At <strong>Shoppy</strong>, we believe in making shopping accessible
          and enjoyable. Whether you are looking for the latest fashion trends,
          home essentials, or unique gifts, we have something for everyone. Our
          user-friendly interface and efficient delivery services ensure a
          seamless shopping experience from start to finish.
        </p>

        <h2 className="mt-6 mb-4 text-3xl font-semibold text-gray-800">
          Our Commitment
        </h2>

        <ul className="space-y-2 text-lg text-gray-700 list-disc list-inside">
          <li>
            <strong>Quality Products:</strong> We source products from reputable
            suppliers to ensure you receive only the best.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Your happiness is our
            priority. Our support team is here to assist you with any inquiries.
          </li>
          <li>
            <strong>Secure Shopping:</strong> We utilize the latest security
            measures to protect your personal information and ensure a safe
            shopping experience.
          </li>
        </ul>

        <p className="mt-6 text-lg text-gray-700">
          We are excited to have you on this journey with us! Thank you for
          choosing <strong>Shoppy</strong> for your shopping needs. If you have
          any questions or feedback, feel free to reach out to our customer
          service team.
        </p>

        <p className="mt-4 text-lg text-gray-700">
          Happy Shopping!
          <br />
          The <strong>Shoppy</strong> Team
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
