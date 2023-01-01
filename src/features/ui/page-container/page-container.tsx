import styled from "styled-components";
import Head from "next/head";
import { Header } from "../header";
import { Banner } from "../banner";
import { Layout } from "../layout";

type PageContainerProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  padding: 0 50px;
`;

const ContentContainer = styled.div``;

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Container>
      <Head>
        <title>ProLog</title>
        <meta name="description" content="Error monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Header />

      <div>{children}</div>

      {/* <Footer /> */}
    </Container>
  );
}
