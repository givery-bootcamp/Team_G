"use client";

import { CommandEffect } from "@/components/CommandEffect";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useKonamiCommand } from "@/hooks/useKonamiCommand";
import { finalTransport } from "@/lib/connect";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";

const queryClient = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onCommandFired = () => {
    setIsOpen(true);
  };

  useKonamiCommand(onCommandFired);

  return (
    <WagmiProvider config={config}>
      <SessionProvider>
        <TransportProvider transport={finalTransport}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={lightTheme({
                accentColor: "#0f172a",
                accentColorForeground: "white",
                borderRadius: "medium",
                fontStack: "system",
                overlayBlur: "small",
              })}
              locale="ja"
            >
              {children}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="h-screen !max-w-none bg-black">
                  <CommandEffect />
                </DialogContent>
              </Dialog>
            </RainbowKitProvider>
          </QueryClientProvider>
        </TransportProvider>
      </SessionProvider>
    </WagmiProvider>
  );
};
export default Providers;
