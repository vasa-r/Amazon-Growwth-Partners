interface AddressType {
  addressTitle: string;
  buildNo: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

const validateAddress = (values: AddressType) => {
  const errors: Partial<AddressType> = {};

  if (!values.addressTitle) {
    errors.addressTitle = "Please enter home or office";
  }

  if (!values.buildNo) {
    errors.buildNo = "Building number is required";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.city) {
    errors.city = "City is required";
  }

  if (!values.pincode) {
    errors.address = "Pincode is required";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  }

  const phone = values.phone.split("");
  if (phone.length < 10) {
    errors.phone = "Enter valid phone number";
  }

  return errors;
};

export default validateAddress;
