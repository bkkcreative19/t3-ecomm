import styled from "styled-components";
import React, { useState } from "react";
import { Layout } from "../layout";
import { CiUser } from "react-icons/ci";
import { BsSearch, BsCart } from "react-icons/bs";
import { MdOutlineSort } from "react-icons/md";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { MobileHeader } from "./mobile-header";
import { Dropdown } from "./dropdown";

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

  @media (max-width: 750px) {
    display: none;
  }
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

  @media (max-width: 750px) {
    display: none;
  }
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
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  font-weight: 700;
  font-size: 14px;
  color: #b73225;
`;

const SearchIcon = styled(BsSearch)`
  margin: 0 20px;
`;

const HamburgerMenu = styled(MdOutlineSort)`
  display: none;
  cursor: pointer;

  @media (max-width: 750px) {
    display: flex;
  }
`;

export function Header() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  // const { data } = trpc.cart.getCartTotal.useQuery();

  // console.log(data);

  return (
    <HeaderStyles>
      <Layout>
        <HeaderContainer>
          <Link href="/">
            <Logo>Solreck</Logo>
          </Link>

          <HamburgerMenu onClick={() => setIsOpen(!isOpen)} size={"2.5rem"} />

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
              <Profile onClick={() => setIsDropdown(!isDropdown)}>
                <CiUser /> {session && session.user?.name}
                {isDropdown && <Dropdown />}
              </Profile>
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
        </HeaderContainer>
        {isOpen && <MobileHeader />}
      </Layout>
    </HeaderStyles>
  );
}
