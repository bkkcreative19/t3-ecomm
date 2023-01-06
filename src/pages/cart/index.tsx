import React from "react";

import type { NextPage } from "next";

import { Layout } from "../../features/ui/layout";
import { CartItem } from "../../features/cart/components/cart-item";
import styled from "styled-components";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { ClipLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";

const CartContainer = styled.div`
  margin-top: 10rem;

  @media (max-width: 750px) {
    margin-top: 4rem;
  }
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

  @media (max-width: 750px) {
    width: 100%;
  }
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

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;

  & span {
    margin: 0 auto;
    margin-top: 5rem;
  }
`;

const CartPage: NextPage = () => {
  const { data: cart, isLoading } = trpc.cart.getCart.useQuery();

  const checkoutMutation = trpc.stripe.createCheckout.useMutation();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(
    "pk_test_51KsrI3Lojhc6RaULZKaZj1Hum7EV4anQSc0wo1vsEhiD89exzit12f3lG3HSM5SNJQug4qqnB4re0FMkd1NB2RLx00eDaJDRuq"
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const session = await checkoutMutation.mutateAsync(cart);

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      alert(result?.error.message);
    }
  };

  // const handleCheckout = async () => {

  //   ;
  // };

  let total = 0;

  cart?.cartItems.forEach((item) => {
    const productPrice = item.product.price as number;

    total = total + productPrice * item.quantity!;
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </LoadingContainer>
    );
  }

  if (!cart) {
    return <Layout>add items to cart</Layout>;
  }

  return (
    <>
      <Layout>
        <CartContainer>
          <Head>Shopping Cart</Head>

          <CartItems>
            {cart?.cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  cartItem={item.product}
                  qty={item.quantity}
                />
              );
            })}
          </CartItems>
          <Subtotal>
            <p>Subtotal:</p>
            <p>${total.toFixed(2)}</p>
          </Subtotal>

          <CheckoutButton color="red" onClick={handleCheckout}>
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
