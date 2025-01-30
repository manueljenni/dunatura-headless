export enum SellingPlanType {
  OneTime = "689000841480", // Einzelkauf
  Monthly = "688728244488", // Flexibles Abo
  Quarterly = "688658252040", // Dreimonats-Paket
}

export const PLAN_DISCOUNTS: Record<SellingPlanType, number> = {
  [SellingPlanType.OneTime]: 0, // No discount
  [SellingPlanType.Monthly]: 30, // 30% off for Flexibles Abo
  [SellingPlanType.Quarterly]: 10, // 10% off for Dreimonats-Paket
};
