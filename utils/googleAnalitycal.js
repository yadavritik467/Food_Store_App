import axios from 'axios';

const trackingId = 'G-HJ7XFNPYCC';
const measurementEndpoint = `https://www.google-analytics.com/collect?v=1&t=event&tid=${trackingId}&cid=CLIENT_ID&ec=order&ea=placed`;

export const sendOrderPlacedEvent = async (orderId) => {
  try {
    // Include the order ID in the measurement endpoint
    const orderMeasurementEndpoint = `${measurementEndpoint}&cd=${orderId}`;
    await axios.post(orderMeasurementEndpoint);
    console.log('Order placed event sent to Google Analytics.');
  } catch (error) {
    console.error('Error sending order placed event:', error.message);
  }
};

// Call the function when an order is placed

