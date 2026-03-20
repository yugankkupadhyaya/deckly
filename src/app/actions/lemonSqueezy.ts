'use server';
import { lemonSqueezyClient } from '../../lib/axios';

export const buySubscription = async (buyUserId: string) => {
  try {
    const res = await lemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY!).post('/checkouts', {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            custom: {
              buyerUserId: buyUserId,
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMON_SQUEEZY_STORE_ID!,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: process.env.LEMON_SQUEEZY_VARIANT_ID!,
            },
          },
        },
      },
    });
   
    console.log(res.data);

    return { status: 200, url: res.data.data.attributes.url };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Failed to create checkout' };
  }
};
