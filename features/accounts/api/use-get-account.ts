import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccount = (id?: string) => {
  return useQuery({
    queryKey: ["account", { id }],
    enabled: !!id,
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
