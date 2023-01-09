import React from "react";
import { Layout } from "../../features/ui/layout";

import { useRouter } from "next/router";
import { ProductInfo } from "../../features/product/components/product-info";
import { trpc } from "../../utils/trpc";

export default function ProductDetails() {
  const router = useRouter();
  const query: string = router.query.id as string;
  const updateCartTotalMutation = trpc.cart.updateCartTotal.useMutation();
  const createCartItemMutation = trpc.cart.createCartItem.useMutation();

  const { data: product } = trpc.product.getProductByTitle.useQuery(query);

  const handleAddToCart = async () => {
    // console.log("yay");

    // const res = await createCartMutation.mutateAsync("awf");
    await createCartItemMutation.mutateAsync({
      productId: product?.id,
    });

    await updateCartTotalMutation.mutateAsync(+1);
    // console.log(res);
  };
  // console.log(product);

  // const { data } = useProduct(router.query.id);

  return (
    <>
      <ProductInfo handleAddToCart={handleAddToCart} data={product} />
    </>
  );
}
