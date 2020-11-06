import React from "react";
import { Card } from "grommet";

const Customer = ({ customer }) => {
  return <Card pad="large">{customer.customerName}</Card>;
};

export default Customer;
