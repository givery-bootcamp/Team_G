import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Team7",
  projectId: "bb42be304865c0e0af601b19dad6f51f",
  chains: [baseSepolia],
  ssr: true
});
