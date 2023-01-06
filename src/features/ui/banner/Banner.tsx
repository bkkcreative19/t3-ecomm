import React from "react";
import styled from "styled-components";
import { Layout } from "../layout";

const BannerStyles = styled.div`
  background: #004e7c;
  padding: 1.5rem 0;

  @media (max-width: 750px) {
    display: none;
  }
`;

const Yay = styled.p`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  text-align: center;
  letter-spacing: 0.2px;

  /* light-text-color */

  color: #ffffff;
`;

export function Banner() {
  return (
    <BannerStyles>
      <Layout>
        <Yay>Follow Us and get a chance to win 80% off</Yay>
      </Layout>
    </BannerStyles>
  );
}
