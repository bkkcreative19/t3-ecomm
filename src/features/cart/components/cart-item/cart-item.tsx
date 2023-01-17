import React from "react";
import styled from "styled-components";
import { trpc } from "../../../../utils/trpc";

import { CartItemTypes } from "./types/cart-item";

const CartItemStyles = styled.div`
  border-bottom: 2px solid #dadada;
  display: flex;
  align-items: center;
  padding: 1rem 0;
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
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: start;
  }
`;

export function CartItem({ cartItem, qty, id }: any) {
  const utils = trpc.useContext();

  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation({});
  const updateCartTotalMutation = trpc.cart.updateCartTotal.useMutation();
  const deleteCartItemMutation = trpc.cart.deleteCartItem.useMutation({
    onMutate: () => {
      // utils.cart.getCart.cancel();

      const optimisticUpdate = utils.cart.getCart.getData();

      if (optimisticUpdate) {
        //  utils.cart.getCart.setData(optimisticUpdate);
      }

      console.log(optimisticUpdate);
    },
  });

  const handleUpdateQty = async (id: any, operation: number) => {
    await updateQuantityMutation.mutateAsync({ id, operation });
    utils.cart.invalidate();
  };

  const handleRemoveItem = async () => {
    await deleteCartItemMutation.mutateAsync(id);
    await updateCartTotalMutation.mutateAsync(-1);
    utils.cart.invalidate();
  };

  return (
    <CartItemStyles>
      <Image src={cartItem.imageURL} alt="product image" />
      <Content>
        <Title>{cartItem.title}</Title>
        <Price>${cartItem.price.toFixed(2)}</Price>
        <Qty>
          <div onClick={() => handleUpdateQty(id, -1)}>-</div>
          <p>{updateQuantityMutation.isLoading ? "...loading" : qty}</p>
          <div onClick={() => handleUpdateQty(id, +1)}>+</div>
        </Qty>
        <Subtotal>${(cartItem.price * qty).toFixed(2)}</Subtotal>
        <Remove onClick={handleRemoveItem}>Remove x</Remove>
      </Content>
    </CartItemStyles>
  );
}
