import close from "../../assets/close.svg";

const AddAddress = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="w-[500px] p-10  rounded-[10px] bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative">
        <img
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
        />

        <form className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="addressTitle">Address Title</label>
            <input
              className="w-full"
              type="text"
              id="addressTitle"
              placeholder="home or office"
            />
          </div>
          <div>
            <label htmlFor="bNo">House/Building No</label>
            <input
              className="w-full"
              type="text"
              id="bNo"
              placeholder="Enter house number"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              className="w-full"
              type="text"
              id="address"
              placeholder="Full Address"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              className="w-full"
              type="text"
              id="city"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode</label>
            <input
              className="w-full"
              type="text"
              id="pincode"
              placeholder="Enter your pincode"
            />
          </div>
          <button className="btn btn-primary text-white">Save Address</button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
