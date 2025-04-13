"use client";


import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { PaymentOption} from "@/app/lib/definitions";
import { useEffect } from 'react';

interface UseGenerateStripePaymentRouteProps {
    projectId:string;
    paymentOption:PaymentOption | null
}

/**
 * This hook generates a Stripe payment route based on the provided project ID and payment option.
 * It updates the URL with the new route when the payment option changes.
 *
 * @param {string} projectId - The ID of the project for which the payment is being made.
 * @param {PaymentOption} paymentOption - The selected payment option (e.g., full, partial).
 */
export function useGenerateStripePaymentRoute({
    projectId,
    paymentOption
  }: UseGenerateStripePaymentRouteProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    useEffect(() => {
      if (!paymentOption) return;
  
      const params = new URLSearchParams(searchParams);
      params.set('paymentOption', paymentOption);
  
      const paymentUrl = `${pathname}/${projectId}/projectpayment?${params.toString()}`;
      replace(paymentUrl);
    }, [paymentOption]);
  }