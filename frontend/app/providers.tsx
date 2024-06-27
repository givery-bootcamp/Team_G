"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useKonamiCommand } from "@/hooks/useKonamiCommand";
import { finalTransport } from "@/lib/connect";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useState } from "react";

const queryClient = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onCommandFired = () => {
    setIsOpen(true);
  };
  useKonamiCommand(onCommandFired);

  return (
    <SessionProvider>
      <TransportProvider transport={finalTransport}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>Test</DialogContent>
          </Dialog>
        </QueryClientProvider>
      </TransportProvider>
    </SessionProvider>
  );
};
export default Providers;
