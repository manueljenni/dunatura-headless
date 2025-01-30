import { getAllVitamins } from "@/api/fetch";

export default async function VitaminsFromShopifyPage() {
  const vitamins = await getAllVitamins();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Vitamin Subscription Plans</h1>
      <div className="grid gap-6">
        {vitamins?.map((vitamin) => (
          <div key={vitamin.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{vitamin.title}</h2>
              <div className="text-lg font-medium">
                Regular Price: €{vitamin.variants.edges[0].node.price.amount}
              </div>
            </div>

            <div className="grid gap-4">
              {vitamin.variants.edges[0].node.sellingPlanAllocations.edges.map(
                (allocation) => {
                  const plan = allocation.node.sellingPlan;
                  const price = allocation.node.priceAdjustments[0].price.amount;
                  const regularPrice = vitamin.variants.edges[0].node.price.amount;
                  const discount = (
                    ((parseFloat(regularPrice) - parseFloat(price)) /
                      parseFloat(regularPrice)) *
                    100
                  ).toFixed(1);

                  return (
                    <div
                      key={plan.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{plan.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                          {plan.options.map((option) => (
                            <div key={option.name} className="text-sm text-gray-500 mt-1">
                              {option.name}: {option.value}
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">€{price}</div>
                          {discount !== "0.0" && (
                            <div className="text-sm text-green-600">Save {discount}%</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
