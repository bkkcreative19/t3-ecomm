import React from "react";
import styled from "styled-components";
import { useStore } from "../../../../store";
import { CartItemTypes } from "./types/cart-item";

const CartItemStyles = styled.div`
  border-bottom: 2px solid #dadada;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;
const Title = styled.h4`
  font-size: 2rem;
`;
const Price = styled.h4`
  font-size: 1.8rem;
`;

const Qty = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  border: thin solid lightgrey;

  & div {
    background: #f2f2f2;
    padding: 1rem 1.5rem;
    cursor: pointer;
    ma
  }

  & p {
    padding: 1rem 1.5rem;
  }
`;

const Subtotal = styled.h4`
  font-size: 1.8rem;
`;
const Remove = styled.p`
  font-size: 1.4rem;
`;

export function CartItem({ cartItem }: any) {
  const { rewmoveFromCart, increaseQty, decreaseQty, cart, updateCartTotal } =
    useStore();

  return (
    <CartItemStyles>
      <Image src={cartItem.imageURL} />
      <Title>{cartItem.title}</Title>
      <Price>${cartItem.price}.99</Price>
      <Qty>
        <div
          onClick={() => {
            if (cartItem.qty === 1) {
              rewmoveFromCart(cartItem);
            } else {
              decreaseQty(cartItem);
            }

            updateCartTotal();
          }}
        >
          -
        </div>
        <p>{cartItem.qty}</p>
        <div
          onClick={() => {
            increaseQty(cartItem);
            updateCartTotal();
          }}
        >
          +
        </div>
      </Qty>
      <Subtotal>${cartItem.price * cartItem.qty}.99</Subtotal>
      <Remove
        onClick={() => {
          rewmoveFromCart(cartItem);
          updateCartTotal();
        }}
      >
        Remove x
      </Remove>
    </CartItemStyles>
  );
}
