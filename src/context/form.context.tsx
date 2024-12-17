export const inititalFormContext = {
  room: {
    defaultPrice: null,
    roomId: null,
    roomType: "",
    roomNumber: null,
    source: "",
    adults: 0,
    children: 0,
  },
  payment: {
    subTotal: 0, // Thành tiền
    taxFee: 0, // Thuế
    paidAmount: 0, // Số tiền đã thanh toán
    remainingAmount: 0, // Số tiền còn lại
    totalAmount: 0, // Tổng tiền
    paymentMethod: null,
  },
  customer: {
    guestName: "",
    guestID: "",
    guestEmail: "",
    guestPhone: "",
    gender: null,
  },
  date: {
    startDate: "",
    endDate: "",
  },
  setRoom: () => {},
  setPayment: () => {},
  setCustomer: () => {},
  setDate: () => {},
  countNight: 0,
  setCountNight: () => {},
};