import { PlanOption } from "../../products/[productName]/PlanSelector";

export enum PlanType {
  OneTime = "689000841480",
  Monthly = "688728244488",
  Quarterly = "688658252040",
}

interface PlanSelectorProps {
  selectedPlan: PlanType;
  onSelect: (plan: PlanType) => void;
  price: number;
}

export function PlanSelector({ selectedPlan, onSelect, price }: PlanSelectorProps) {
  const planDetails: {
    [key in PlanType]: {
      title: string;
      priceMultiplier: number;
      priceSubtitle: string | null;
      description: string;
    };
  } = {
    [PlanType.OneTime]: {
      title: "Einmaliger Kauf",
      priceMultiplier: 1,
      priceSubtitle: null,
      description: "Einmalige Lieferung",
    },
    [PlanType.Monthly]: {
      title: "Flexibles Abonnement",
      priceMultiplier: 0.8,
      priceSubtitle: "pro Monat",
      description: "Lieferung alle 4 Wochen",
    },
    [PlanType.Quarterly]: {
      title: "Dreimonats-Paket",
      priceMultiplier: 0.8,
      priceSubtitle: "pro Monat",
      description: "3x 28 Packungen",
    },
  };

  return (
    <div className="space-y-4">
      {Object.values(PlanType).map((planType) => (
        <PlanOption
          key={planType}
          plan={planType}
          details={planDetails[planType]}
          isSelected={selectedPlan === planType}
          onSelect={onSelect}
          price={price}
        />
      ))}
    </div>
  );
}
