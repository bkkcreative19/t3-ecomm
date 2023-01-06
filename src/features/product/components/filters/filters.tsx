import React from "react";
import styled from "styled-components";
import { FilterList } from "./filter-list";
import { BsSearch } from "react-icons/bs";

const FilterStyles = styled.div`
  width: 20%;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  border: 1px solid #dadada;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 1.6rem 2rem;
  display: flex;

  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  margin: 2.5rem 0 5.5rem 0;
`;

const Input = styled.input`
  border: none;
  font-weight: 400;
  background: transparent;
  width: 86%;
  &:focus {
    border: none;
    outline: none;
  }
  &:active {
    border: none;
    outline: none;
  }
`;

const Head = styled.h5`
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: 0.2px;
  margin-top: 25px;
  /* text-color */

  color: #252b42;
`;

const SearchIcon = styled(BsSearch)``;

export function Filters({ changeSearch, changeFilters, removeFilters }: any) {
  // const { changeSearch } = useStore();
  return (
    <FilterStyles>
      <Head>Filter:</Head>
      <InputContainer>
        <SearchIcon size={"1.7rem"} color="#737373" />
        <Input
          onChange={(e) => changeSearch(e.target.value)}
          placeholder="Search"
          type="text"
        />
      </InputContainer>

      <FilterList
        title="Brands"
        items={["Bering", "Olivia burton", "Timberland", "Timex", "Nixon"]}
        changeFilters={changeFilters}
        removeFilters={removeFilters}
      />
      <FilterList
        title="Price"
        items={["$0-$100", "$100-$300", "$300-$500", "$500-$1,000"]}
        changeFilters={changeFilters}
        removeFilters={removeFilters}
      />
    </FilterStyles>
  );
}
