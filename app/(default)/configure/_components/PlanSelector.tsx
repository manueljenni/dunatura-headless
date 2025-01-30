import { PLAN_DISCOUNTS, SellingPlanType } from "@/types/selling-plans";
import { PlanOption } from "../../products/[productName]/PlanSelector";

export enum PlanType {
  OneTime = "689000841480",
  Monthly = "688728244488",
  Quarterly = "688658252040",
}

interface PlanSelectorProps {
  selectedPlan: SellingPlanType;
  onSelect: (plan: SellingPlanType) => void;
  price: number;
}

export function PlanSelector({ selectedPlan, onSelect, price }: PlanSelectorProps) {
  const planDetails: {
    [key in SellingPlanType]: {
      title: string;
      priceSubtitle: string | null;
      description: string;
    };
  } = {
    [SellingPlanType.OneTime]: {
      title: "Einmaliger Kauf",
      priceSubtitle: null,
      description: "Einmalige Lieferung",
    },
    [SellingPlanType.Monthly]: {
      title: "Flexibles Abonnement",
      priceSubtitle: "pro Monat",
      description: "Lieferung alle 4 Wochen",
    },
    [SellingPlanType.Quarterly]: {
      title: "Dreimonats-Paket",
      priceSubtitle: "pro Monat",
      description: "3x 28 Packungen",
    },
  };

  // Calculate price using PLAN_DISCOUNTS instead of hardcoded multipliers
  const getDiscountedPrice = (plan: SellingPlanType) => {
    const discount = PLAN_DISCOUNTS[plan];
    return price * (1 - discount / 100);
  };

  return (
    <div className="space-y-4">
      {Object.values(SellingPlanType).map((planType) => (
        <PlanOption
          key={planType}
          plan={planType}
          details={planDetails[planType]}
          isSelected={selectedPlan === planType}
          onSelect={onSelect}
          price={getDiscountedPrice(planType)}
        />
      ))}
    </div>
  );
}
