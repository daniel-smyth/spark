import { useQuery } from '@tanstack/react-query';

export type GasEstimate = { gasPrice: number; ethPrice: number };

export function useGas() {
  return useQuery(
    ['gas-price', 'ethereum'],
    async () => {
      const res = await fetch(`/api/gas`);
      return res.json() as Promise<GasEstimate>;
    },
    {
      // API key from etherscan only allows up to 5 pulls
      // a minute, ideally this would be set to 60,000 MS
      // refetchInterval: 60_000
    }
  );
}
