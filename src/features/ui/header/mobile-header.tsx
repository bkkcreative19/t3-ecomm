import React from "react";
import styled from "styled-components";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import { CiUser } from "react-icons/ci";
import { BsSearch, BsCart } from "react-icons/bs";

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 4rem;
`;

const ListItem = styled.div`
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */

  letter-spacing: 0.2px;

  /* second-text-color */

  color: #737373;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
  gap: 1.5rem;
`;

const LoginRegister = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  font-weight: 700;
  font-size: 14px;
  color: #b73225;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
  font-weight: 700;
  font-size: 14px;
  color: #b73225;
`;

const SearchIcon = styled(BsSearch)`
  margin: 0 20px;
`;

export function MobileHeader() {
  const { data: session } = useSession();
  return (
    <div>
      <NavList>
        <Link href="/">
          <ListItem>Home</ListItem>
        </Link>

        <Link href="/products">
          <ListItem>Shop</ListItem>
        </Link>
        <ListItem>About</ListItem>
        <ListItem>Blog</ListItem>
        <ListItem>Contact</ListItem>
      </NavList>

      <Options>
        {session ? (
          <Link href="/profile">
            <Profile>
              <CiUser /> {session && session.user?.name}
            </Profile>
          </Link>
        ) : (
          <LoginRegister onClick={() => signIn()}>
            <CiUser /> Login / Register
          </LoginRegister>
        )}

        <SearchIcon size={"1.7rem"} color="#B73225" />
        <Link href="/cart">
          <BsCart size={"1.7rem"} color="#B73225" />
        </Link>
      </Options>
    </div>
  );
}
