import 'server-only';

import Stripe from 'stripe';


if(!process.env.PRODUCTION_STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not defined in the environment variables');
}


export const stripe = new Stripe(process.env.PRODUCTION_STRIPE_SECRET_KEY);