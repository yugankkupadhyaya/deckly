'use server';
import { createLemonSqueezyClient } from '../../lib/axios';

export const buySubscription = async (buyUserId: string) => {
  try {
    console.log('🔥 buySubscription called', buyUserId);
    const client = createLemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY!);
    console.log('STORE ID:', process.env.LEMON_SQUEEZY_STORE_ID);
    console.log('VARIANT ID:', process.env.LEMON_SQUEEZY_VARIANT_ID);
    const res = await client.post('/checkouts', {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            custom: {
              user_id: buyUserId,
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

    const checkoutUrl = res.data.data.attributes.url;

    if (!checkoutUrl) {
      console.error('No checkout URL in response:', res.data);
      return { success: false as const, error: 'No checkout URL returned' };
    }

    return { success: true as const, url: checkoutUrl };
  } catch (error: any) {
    console.error('Lemon Squeezy checkout error:', error.response?.data || error.message);
    return {
      success: false as const,
      error: error.response?.data?.errors?.[0]?.detail || 'Failed to create checkout',
    };
  }
};
