import { ProductTypes } from "../../types/product";
import styled from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsStarFill, BsStar } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";

type ProductProps = {
  product: ProductTypes;
  view: string;
};

const ProductStyles = styled.div<Pick<ProductProps, "view">>`
  height: ${(p) => (p.view === "list" ? "215px" : "455px")};
  display: ${(p) => (p.view === "list" ? "flex" : "")};
  cursor: pointer;
  & img {
    width: ${(p) => p.view === "list" && "100%"};
    height: 100%;
    object-fit: ${(p) => p.view === "list" && "contain"};
  }
  gap: 70px;

  @media (max-width: 750px) {
    display: block;
    height: 455px;
  }
`;
const Title = styled.h3`
  margin-top: 28px;
  font-weight: 900;
  font-size: 1.6rem;
  line-height: 24px;
  /* identical to box height, or 150% */

  letter-spacing: 0.1px;

  /* text-color */

  color: #252b42;
`;

const Pricing = styled.div`
  margin-top: 10px;
  display: flex;
  font-family: Raleway, sans-serif;
  gap: 5px;
  & span:first-child {
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    /* identical to box height, or 138% */

    letter-spacing: 0.2px;

    /* muted-color */

    color: #bdbdbd;
  }

  & span:last-child {
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    /* identical to box height, or 138% */

    text-align: center;
    letter-spacing: 0.2px;

    /* secondary-color-1 */

    color: #004e7c;
  }
`;

const Content = styled.div`
  flex: 3;
`;

const Description = styled.p<Pick<ProductProps, "view">>`
  font-weight: 300;
  font-size: 16px;

  line-height: 26px;
  /* or 144% */
  margin-top: 2.8rem;
  letter-spacing: 0.2px;
  width: 70%;
  color: #858585;

  @media (max-width: 750px) {
    display: none;
  }
`;

const ImageContainer = styled.div`
  flex: 1;

  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
  }

  & img {
    width: 235px;
    height: 300px;
    object-fit: cover;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

const Rating = styled.div`
  display: flex;
  margin-top: 1.8rem;
  gap: 11px;
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

export function Product({ product, view }: ProductProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`products/${product.title}`);
  };

  return (
    <ProductStyles onClick={handleClick} view={view}>
      <ImageContainer>
        <img src={product.imageURL} alt="product" />
      </ImageContainer>

      <Content>
        <Title>{product.title}</Title>
        <Pricing>
          <span>$16.48</span> <span>${product.price}.99</span>
        </Pricing>
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
        {view === "list" && (
          <Description view={view}>
            {product.description.slice(0, 150)} ...
          </Description>
        )}
      </Content>
    </ProductStyles>
  );
}
