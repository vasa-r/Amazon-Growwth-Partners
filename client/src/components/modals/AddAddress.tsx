import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import close from "../../assets/close.svg";
import validateAddress from "../../validation/validateAddress";
import { toast } from "react-toastify";

interface AddressType {
  addressTitle: string;
  buildNo: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

interface AddProps {
  showAddress: boolean;
  setModal: (arg: boolean) => void;
}

const AddAddress = ({ showAddress, setModal }: AddProps) => {
  const initialValues = {
    addressTitle: "",
    buildNo: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  };
  const [addressData, setAddressData] = useState<AddressType>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<AddressType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateAddress(addressData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        console.log("address added");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setAddressData(initialValues);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  useEffect(() => {
    console.log(addressData);
  }, [addressData]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    if (showAddress) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showAddress, setModal]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className=" p-10  rounded-md bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative"
      >
        <img
          onClick={() => setModal(false)}
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
        />

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <div>
              <label htmlFor="addressTitle">Address Type</label>
              <input
                className="w-full"
                type="text"
                name="addressTitle"
                id="addressTitle"
                placeholder="home or office"
                value={addressData.addressTitle}
                onChange={handleChange}
              />
              {<p className="error">{formErrors.addressTitle}</p>}
            </div>
            <div>
              <label htmlFor="buildNo">House/Building No</label>
              <input
                className="w-full"
                type="text"
                name="buildNo"
                id="buildNo"
                placeholder="Enter house number"
                value={addressData.buildNo}
                onChange={handleChange}
              />
              {<p className="error">{formErrors.buildNo}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              className="w-full"
              type="text"
              name="address"
              id="address"
              placeholder="Full Address"
              value={addressData.address}
              onChange={handleChange}
            />
            {<p className="error">{formErrors.address}</p>}
          </div>
          <div className="flex gap-10">
            <div>
              <label htmlFor="city">City</label>
              <input
                className="w-full"
                type="text"
                name="city"
                id="city"
                placeholder="Enter your city"
                value={addressData.city}
                onChange={handleChange}
              />
              {<p className="error">{formErrors.city}</p>}
            </div>
            <div>
              <label htmlFor="pincode">Pincode</label>
              <input
                className="w-full"
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Enter your pincode"
                value={addressData.pincode}
                onChange={handleChange}
              />
              {<p className="error">{formErrors.pincode}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className="w-full"
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone"
              value={addressData.phone}
              onChange={handleChange}
            />
            {<p className="error">{formErrors.phone}</p>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary text-white"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
