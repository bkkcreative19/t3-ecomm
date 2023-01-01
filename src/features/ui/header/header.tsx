import styled from "styled-components";
import React from "react";
import { Layout } from "../layout";
import { CiUser } from "react-icons/ci";
import { BsSearch, BsCart } from "react-icons/bs";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const HeaderStyles = styled.header``;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  /* identical to box height, or 115% */

  letter-spacing: 0.1px;

  /* text-color */

  color: #252b42;
`;

const NavList = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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
`;

const LoginRegister = styled.div`
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

export function Header() {
  return (
    <HeaderStyles>
      <Layout>
        <HeaderContainer>
          <Link href="/">
            <Logo>Solreck</Logo>
          </Link>

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
            <Link href="/login">
              <LoginRegister>
                <CiUser /> Login / Register
              </LoginRegister>
            </Link>

            <SearchIcon size={"1.7rem"} color="#B73225" />
            <Link href="/cart">
              <BsCart size={"1.7rem"} color="#B73225" />
            </Link>
          </Options>
        </HeaderContainer>
      </Layout>
    </HeaderStyles>
  );
}
