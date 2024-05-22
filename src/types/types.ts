export interface Fields {
  id: number;
  wallet: string;
  amount: number;
  currencyType: string;
}

export type fieldType = "amount" | "wallet";

export type valueFromSheet = [[string, number, string]];
