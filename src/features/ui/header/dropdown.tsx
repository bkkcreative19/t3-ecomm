import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { signOut } from "next-auth/react";

const DropdownStyles = styled.div`
  position: absolute;
  top: 2rem;
  background: #ffffff;
  z-index: 1000;
  box-shadow: 1px 1px 1px #333333;
  width: 100%;
  padding: 1rem;

  & p {
    color: #333333;
  }
`;

export function Dropdown() {
  return (
    <DropdownStyles>
      <Link href="/profile">
        <p>Profile</p>
      </Link>

      <p onClick={() => signOut()}>Logout</p>
    </DropdownStyles>
  );
}
