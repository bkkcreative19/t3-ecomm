import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { PageContainer } from "../features/ui/page-container";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
