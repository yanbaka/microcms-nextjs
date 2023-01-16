import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'hiroshitest',
  apiKey: process.env.API_KEY
});