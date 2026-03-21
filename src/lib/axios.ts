import axios from 'axios';

const LEMON_SQUEEZY_BASE_URL = 'https://api.lemonsqueezy.com/v1';

export const createLemonSqueezyClient = (apiKey: string) => {
  return axios.create({
    baseURL: LEMON_SQUEEZY_BASE_URL,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
