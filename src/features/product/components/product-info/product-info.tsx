import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStar } from "react-icons/bs";
import type { ProductTypes } from "../../types/product";

type ProductInfoProps = {
  data: ProductTypes[];
};
type ImageProps = {
  imageSrc: string;
};

const ProductInfoStyles = styled.div`
  height: 100vh;
  display: flex;

  background: #fafafa;
  padding: 8rem 0;
`;

const ImageContainer = styled.div<ImageProps>`
  width: 500px;

  background: ${(p) => `url("${p.imageSrc}")`} no-repeat;
  background-position: top -50px left 200px;
  background-size: contain;
  flex: 2;
`;

const Content = styled.div`
  flex: 2;
  padding: 7rem 10rem;
`;

const Title = styled.h2`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 4.5rem;
  line-height: 58px;
  /* identical to box height, or 118% */

  letter-spacing: 0.2px;

  /* text-color */

  color: #252b42;
`;

const Price = styled.p`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */
  margin-top: 2.3rem;
  letter-spacing: 0.1px;

  /* text-color */

  color: #252b42;
`;

const Rating = styled.div`
  display: flex;
  margin-top: 1.8rem;
  gap: 11px;
`;

const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

const Review = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: 0.2px;

  /* second-text-color */

  color: #737373;
`;

const Availablity = styled.div`
  font-family: Raleway, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */
  margin-top: 5px;
  letter-spacing: 0.2px;

  /* primary-color */

  color: #b73225;
  & span {
    color: #737373;
    margin-right: 5px;
  }
`;

const Description = styled.p`
  font-family: Raleway, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 1rem;
  letter-spacing: 0.2px;
  margin-top: 3.5rem;
  color: #858585;
`;

const Button = styled.button`
  padding: 1rem 1.7rem;
  margin-top: 3rem;
  background: #b73225;
  border-radius: 5px;
  border: none;
  font-family: Raleway, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: 0.2px;

  /* light-text-color */

  color: #ffffff;
`;

export function ProductInfo({ data, handleAddToCart }: any) {
  const product = data;
  // const { addToCart, updateCartTotal } = useStore();

  if (!product) {
    return <h1>loading...</h1>;
  }
  return (
    <ProductInfoStyles>
      <ImageContainer imageSrc={product.imageURL}></ImageContainer>
      <Content>
        <Title>{product.title}</Title>
        <Rating>
          <Stars>
            <BsStarFill color="#F3CD03" size={"1.4rem"} />
            <BsStarFill color="#F3CD03" size={"1.4rem"} />
            <BsStarFill color="#F3CD03" size={"1.4rem"} />
            <BsStarFill color="#F3CD03" size={"1.4rem"} />
            <BsStar color="#F3CD03" size={"1.4rem"} />
          </Stars>
          <Review> 10 Reviews</Review>
        </Rating>
        <Price>${product.price}.99</Price>
        <Availablity>
          <span>Availablity :</span>In Stock
        </Availablity>

        <Description>{product.description}</Description>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Content>
    </ProductInfoStyles>
  );
}
