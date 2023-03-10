/* eslint-disable prefer-const */
import { Product } from "../product";
import type { ProductTypes } from "../../types/product";
import styled from "styled-components";
import { BsFillGridFill, BsListCheck } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { ClipLoader } from "react-spinners";

type Props = {
  view: string;
};

const ProductListStyles = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.view === "grid" ? "repeat(auto-fill, minmax(240px, 1fr))" : "1fr"};
  gap: ${(p) => (p.view === "list" ? "7.5rem" : "3.5rem")};

  @media (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
  }
  width: 100%;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 66px;
  margin-top: 30px;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const Results = styled.p`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.2px;

  /* second-text-color */

  color: #737373;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Views = styled.div`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  display: flex;
  align-items: center;
  letter-spacing: 0.2px;

  @media (max-width: 750px) {
    display: none;
  }

  /* second-text-color */

  color: #737373;
`;

const Icon = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #ececec;
  border-radius: 5px;
  display: flex;
  place-items: center;
  justify-content: center;
  cursor: pointer;

  &:first-child {
    margin: 0 6px;
  }
`;
const SelectContainer = styled.select`
  width: 191px;
  background: #f9f9f9;
  padding: 1.5rem;
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */
  cursor: pointer;
  letter-spacing: 0.2px;

  /* second-text-color */

  color: #737373;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;

  & span {
    margin: 0 auto;
    margin-top: 5rem;
  }
`;

export function ProductList({
  prices,
  brands,
  search,
  changeSortBy,
  sortBy,
}: any) {
  const router = useRouter();
  const filters = {
    prices,
    brands,
    search,
    sortBy,
  };
  const { data: products, isLoading } =
    trpc.product.getProducts.useQuery(filters);

  // const { filters, changeSortBy, sortBy, search } = useStore();
  // const filteredProducts = filterProducts(brands, products);
  // const yay = filterPrice(prices, filteredProducts);

  // const sortedProducts = sortProducts(sortBy, yay);
  // const searchedProducts = filterSearch(search, yay);

  const [view, setView] = useState("grid");

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

  return (
    <Container>
      <ToolBar>
        <Results>Showing all {products?.length} results</Results>
        <Views>
          Views:
          <Icon onClick={() => setView("grid")}>
            <BsFillGridFill />
          </Icon>
          <Icon>
            <BsListCheck onClick={() => setView("list")} />
          </Icon>
        </Views>

        <SelectContainer
          onChange={(e) => changeSortBy(e.target.value)}
          name="sort"
          id=""
          value={sortBy}
        >
          <option value="desc">Price: high to low</option>
          <option value="asc">Price: low to high </option>
        </SelectContainer>
      </ToolBar>
      <ProductListStyles view={view}>
        {products?.map((product: any) => {
          return <Product view={view} key={product.id} product={product} />;
        })}
      </ProductListStyles>
    </Container>
  );
}
