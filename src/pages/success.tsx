import type { NextPage } from "next";
import { useEffect } from "react";

import styled from "styled-components";

import { signIn } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const SuccessPage: NextPage = () => {
  //   deleteCartMutation.mutateAsync();

  return <>Your order have been completed</>;
};

export default SuccessPage;
