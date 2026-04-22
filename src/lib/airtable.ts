import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const tables = {
  users: base('Clients'),
  events: base('Events'),
  photographers: base('Photographers'),
  photos: base('Photos'),
  carts: base('Carts'),
  cartItems: base('Cart Items'),
  orders: base('Orders'),
  orderItems: base('Order Items'),
  deliveries: base('Deliveries'),
};

export default base;
