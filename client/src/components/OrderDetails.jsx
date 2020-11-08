import React from "react";
import styled from "styled-components";
import Product from "./Product";
import {
  DetailItem,
  DetailsWrapper,
  FullWidthWrapper,
  SectionTitle,
} from "./shared";

const Wrapper = styled.div`
  border: 1px solid #e2e2e2;
  border-top: none;
  margin-bottom: -1px;
  padding: 10px 15px 15px;

  ${DetailItem} {
    width: 50%;

    &.fullWidth {
      width: 100%;
    }
  }
`;
const OrderDetails = ({ order }) => {
  return (
    <Wrapper>
      <SectionTitle className="small noSpacingTop">Order Details</SectionTitle>
      <DetailsWrapper>
        <DetailItem>
          <strong>Number:</strong> {order.orderNumber}
        </DetailItem>
        <DetailItem>
          <strong>Status:</strong> {order.status}
        </DetailItem>
        <DetailItem>
          <strong>Date:</strong> {order.orderDate}
        </DetailItem>
        <DetailItem>
          <strong>Quantity Ordered:</strong> {order.quantityOrdered}
        </DetailItem>
        <DetailItem>
          <strong>Required Date:</strong> {order.requiredDate}
        </DetailItem>
        <DetailItem>
          <strong>Shipped Date:</strong> {order.shippedDate}
        </DetailItem>
        {order.comments && (
          <DetailItem className="fullWidth">
            <strong>Comments:</strong>
            <FullWidthWrapper>{order.comments}</FullWidthWrapper>
          </DetailItem>
        )}
      </DetailsWrapper>
      <SectionTitle className="small">Order Products</SectionTitle>
      {order.items.map(({ product, priceEach }) => (
        <Product
          key={product.productCode}
          product={product}
          priceEach={priceEach}
        />
      ))}
    </Wrapper>
  );
};

export default OrderDetails;
