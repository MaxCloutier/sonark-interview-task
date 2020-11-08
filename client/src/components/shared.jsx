import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0 20px;

  &.small {
    font-size: 16px;
    margin-bottom: 5px;
  }

  &.noSpacingTop {
    margin-top: 0;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;

export const FullWidthWrapper = styled.span`
  display: block;
  width: 100%;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  justify-content: space-between;
`;

export const ListItem = styled.li`
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  list-style: none;
  padding: 15px;
  transition: background 0.3s;

  &:not(.header) {
    cursor: pointer;

    &:hover {
      background: #e2e2e2;
    }
  }

  &:not(:first-child) {
    border-top: 1px solid #e2e2e2;
  }

  &.expanded {
    border: 1px solid #e2e2e2;
    border-bottom: none;
  }
`;

export const Details = styled.ul`
  font-size: 14px;
  padding: 0;
`;

export const DetailItem = styled.li`
  list-style: none;
  margin-bottom: 5px;

  strong {
    font-weight: 600;
  }
`;
