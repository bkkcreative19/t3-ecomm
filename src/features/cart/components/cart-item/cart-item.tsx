import React from "react";
import styled from "styled-components";
import { trpc } from "../../../../utils/trpc";

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

export function CartItem({ cartItem, qty, id }: any) {
  const utils = trpc.useContext();
  const addQuantityMutation = trpc.cart.addQuantity.useMutation({});
  const minusQuantityMutation = trpc.cart.minusQuantity.useMutation();
  // const handleCheckout = async () => {
  //   const { data } = await axios.post(
  //     "http://localhost:5000/create-checkout-session",
  //     {
  //       cartItems: cart,
  //     }
  //   );

  const handleUpdateQty = async (id: any, op: string) => {
    if (op === "add") {
      await addQuantityMutation.mutateAsync(id);
    } else {
      await minusQuantityMutation.mutateAsync(id);
    }
    utils.cart.invalidate();
  };

  return (
    <CartItemStyles>
      <Image src={cartItem.imageURL} />
      <Title>{cartItem.title}</Title>
      <Price>${cartItem.price}.99</Price>
      <Qty>
        <div onClick={() => handleUpdateQty(id, "subtract")}>-</div>
        <p>
          {addQuantityMutation.isLoading || minusQuantityMutation.isLoading
            ? "...loading"
            : qty}
        </p>
        <div onClick={() => handleUpdateQty(id, "add")}>+</div>
      </Qty>
      <Subtotal>${cartItem.price * qty}.99</Subtotal>
      <Remove>Remove x</Remove>
    </CartItemStyles>
  );
}
