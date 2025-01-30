export enum PlanType {
  OneTime = "one-time",
  Monthly = "monthly",
  Quarterly = "quarterly",
}

export const LOOP_SUBSCRIPTION_IDS = {
  [PlanType.OneTime]: "689000841480",
  [PlanType.Monthly]: "688728244488",
  [PlanType.Quarterly]: "688658252040",
} as const;

export const LOOP_BUNDLE_DATA = {
  [LOOP_SUBSCRIPTION_IDS[PlanType.OneTime]]: {
    bundleId: "01HHC6A05J6G8FTKWDPTE7RHAK",
    boxSizeId: "01HHC6A8E7H0HMBWFWGCMR6AHF",
  },
  [LOOP_SUBSCRIPTION_IDS[PlanType.Monthly]]: {
    bundleId: "01HHC69YTENFC277KGK3NB72HH",
    boxSizeId: "01HHC6A74G56TNXEZ396XV928S",
  },
  [LOOP_SUBSCRIPTION_IDS[PlanType.Quarterly]]: {
    bundleId: "01HHC69YJFS1YHF7GN7SWSK814",
    boxSizeId: "01HHC6A6T6GTRBKD66MY97PQ4G",
  },
} as const;
