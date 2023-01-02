import dayjs from "dayjs";
const now = dayjs();
const isoDate = now.toISOString();

const Mock = {
  TICKET: {
    id: 1,
    category: 'ROUND_TRIP',
    from: 'JAKARTA',
    to: 'MEDAN',
    departureTime: isoDate,
    returnTime: now.add(1, 'day').toISOString(),
    price: 980000,
    flightNumber: 'AX31V',
    duration: 32,
    imageId: 'string',
    imageUrl: 'string.com/image.png',
    description: 'Lorem ipsum blbalaldanlwdj',
    createdBy: 1,
    createdAt: isoDate,
    updatedBy: 1,
    updatedAt: isoDate,
    deletedAt: isoDate,
  },

  TRANSACTION: {
    id: 1,
    userId: 1,
    ticketId: 1,
    amount: 1,
    bookingCode: 'VQSGU4NRD',
    deletedAt: null,
    createdAt: '2022-12-14T08:09:22.006Z',
    updatedAt: '2022-12-14T08:09:22.006Z',
  },

  USER: {
    id: 1,
    name: 'User',
    email: `user@gmail.com`,
    role: 'USER',
    imageId: 'image',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    phone: `1234567890`,
  },
};

export default Mock;
