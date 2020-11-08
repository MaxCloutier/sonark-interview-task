import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ListItem } from "./shared";

const Name = styled.span`
  font-weight: 600;
`;

const Address = styled.span`
  font-weight: 400;
`;

const Customer = ({ customer }) => {
  const history = useHistory();

  return (
    <ListItem
      pad="large"
      className="customer"
      onClick={() => {
        history.push(`/customer/${customer.customerNumber}`);
      }}
    >
      <Name>{customer.customerName}</Name>
      <Address>{customer.formatedAddress}</Address>
    </ListItem>
  );
};

export default Customer;
