import React from "react";
import axios from "axios";
import type { NextPage } from "next";
import { useStore } from "../../store";
import { Layout } from "../../features/ui/layout";
import { CartItem } from "../../features/cart/components/cart-item";
import styled from "styled-components";
import Link from "next/link";

const CartContainer = styled.div`
  margin-top: 10rem;
`;

const Head = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`;

const CartItems = styled.div`
  border-top: 2px solid #dadada;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: block;
  padding: 1.3rem 1.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  width: 280px;
  margin-top: 1.5rem;
  margin-left: auto;
  cursor: pointer;
`;

const CheckoutButton = styled(Button)`
  background: #141414;
  color: #ffffff;
`;
const ContinueButton = styled(Button)`
  background: #ffffff;
  color: #141414;
`;

const Subtotal = styled.div`
  color: #0f0f0f;
  font-size: 2.2rem;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  justify-content: end;
  gap: 2rem;
  margin: 3rem 0;
`;

const CartPage: NextPage = () => {
  const { cart, cartTotal } = useStore();

  const handleCheckout = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/create-checkout-session",
      {
        cartItems: cart,
      }
    );

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <Layout>
        <CartContainer>
          <Head>Shopping Cart</Head>

          <CartItems>
            {cart.map((item) => {
              return <CartItem key={item.id} cartItem={item} />;
            })}
          </CartItems>
          <Subtotal>
            <p>Subtotal:</p>
            <p>${cartTotal}</p>
          </Subtotal>

          <CheckoutButton onClick={handleCheckout} color="red">
            Checkout
          </CheckoutButton>
          <Link href="/products">
            <ContinueButton>Continue Shopping</ContinueButton>
          </Link>
        </CartContainer>
      </Layout>
    </>
  );
};

export default CartPage;
