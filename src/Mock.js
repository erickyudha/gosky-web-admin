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
};

export default Mock;
