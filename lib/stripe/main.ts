import { loadStripe } from '@stripe/stripe-js';

export async function main() {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

} 
