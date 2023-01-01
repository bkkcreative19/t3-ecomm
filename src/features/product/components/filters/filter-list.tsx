import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useRouter } from "next/router";
import { Checkbox } from "../../../ui/checkbox/checkbox";

type FilterListProps = {
  title: string;
  items: string[];
};

const FilterListStyles = styled.div``;

const Title = styled.h4`
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */
  margin: 3.2rem 0;
  letter-spacing: 0.2px;
  cursor: pointer;
  /* text-color */

  color: #252b42;
`;

const ListItem = styled.p`
  font-weight: 300;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */
  margin-top: 1.6rem;
  letter-spacing: 0.2px;

  /* second-text-color */

  color: #737373;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export function FilterList({
  title,
  items,
  changeFilters,
  removeFilters,
}: any) {
  const handleClick = (item: any) => {
    // arr.push(item);
    // setString(arr);
  };

  return (
    <FilterListStyles>
      <Title>{title}</Title>
      <Options>
        {items.map((item: string) => {
          return (
            <Checkbox
              changeFilters={changeFilters}
              removeFilters={removeFilters}
              title={title}
              key={item}
              label={item}
              disabled={false}
            />
          );
        })}
      </Options>
    </FilterListStyles>
  );
}
