// lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}




export function calculateDiscountedCostWithoutFee(originalPrice: number): number {
  const feeRate = 0.10;
  const estimatedFeeAmount = originalPrice * feeRate;
  const cost = Math.round(originalPrice -  estimatedFeeAmount);
  return cost;
}
