import React, { useState } from "react";
import { Layout } from "../../features/ui/layout";

import { useRouter } from "next/router";
import { ProductInfo } from "../../features/product/components/product-info";
import { trpc } from "../../utils/trpc";

export default function ProductDetails() {
  const router = useRouter();
  const ctx = trpc.useContext();
  const query: string = router.query.id as string;
  const updateCartTotalMutation = trpc.cart.updateCartTotal.useMutation();
  const createCartItemMutation = trpc.cart.createCartItem.useMutation({
    onSettled: () => {
      ctx.cart.getCart.invalidate();
    },
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const { data: product } = trpc.product.getProductByTitle.useQuery(
    query || ""
  );
  const { data: cart } = trpc.cart.getCart.useQuery();

  const handleAddToCart = async () => {
    const cartItem = cart?.cartItems.find(
      (item: any) => item.productId === product?.id
    );

    if (!cartItem) {
      router.push("/cart");

      await createCartItemMutation.mutateAsync({
        productId: product?.id,
      });

      await updateCartTotalMutation.mutateAsync(+1);
    }
  };

  return (
    <>
      <ProductInfo
        isDisabled={cart?.cartItems.some(
          (item: any) => item.productId === product?.id
        )}
        handleAddToCart={handleAddToCart}
        data={product}
      />
    </>
  );
}
