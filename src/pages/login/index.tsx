import type { NextPage } from "next";

import styled from "styled-components";
import { Layout } from "../../features/ui/layout";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage: NextPage = () => {
  const handleSignin = (e: any) => {
    e.preventDefault();
    signIn();
  };
  return (
    <>
      <Layout>
        <button onClick={handleSignin}>Login</button>
      </Layout>
    </>
  );
};

export default LoginPage;
