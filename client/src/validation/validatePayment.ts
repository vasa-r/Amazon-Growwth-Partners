interface PaymentType {
  name: string;
  cardNumber?: string;
  cvv?: string;
  upiId?: string;
}

const validatePayment = (values: PaymentType, type: string) => {
  const errors: Partial<PaymentType> = {};

  if (type === "UPI" || type === "Credit Card" || type === "Debit Card") {
    if (!values.name) {
      errors.name = "Please enter name";
    }
  }

  if (type === "UPI") {
    if (!values.upiId) {
      errors.upiId = "Please enter UPI ID";
    } else if (!values.upiId.includes("@")) {
      errors.upiId = "Please enter a valid UPI ID";
    }
  }

  if (type === "Credit Card" || type === "Debit Card") {
    if (!values.cardNumber) {
      errors.cardNumber = "Please provide card number";
    } else if (!/^\d{16}$/.test(values.cardNumber)) {
      errors.cardNumber = "Please provide a valid 16-digit card number";
    }

    if (!values.cvv) {
      errors.cvv = "Please provide CVV";
    } else if (!/^\d{3}$/.test(values.cvv)) {
      errors.cvv = "Please provide a valid 3-digit CVV";
    }
  }

  return errors;
};

export default validatePayment;
