import React from "react";
import styled from "styled-components";
import { DetailItem, DetailsWrapper, FullWidthWrapper } from "./shared";

const Wrapper = styled.div`
  border: 1px solid #e2e2e2;
  margin-bottom: -1px;
  padding: 10px 15px;
`;

const Product = ({ product, priceEach }) => {
  return (
    <Wrapper>
      <DetailsWrapper>
        <DetailItem>
          <strong>Price Paid:</strong> {priceEach}
        </DetailItem>
        <DetailItem>
          <strong>MSRP:</strong> {product.MSRP}
        </DetailItem>
        <DetailItem>
          <strong>Buy Price:</strong> {product.buyPrice}
        </DetailItem>
        <DetailItem>
          <strong>Product Code:</strong> {product.productCode}
        </DetailItem>
        <DetailItem>
          <strong>Product Line:</strong> {product.productLine}
        </DetailItem>
        <DetailItem>
          <strong>Product Scale:</strong> {product.productScale}
        </DetailItem>
        <DetailItem>
          <strong>Product Vendor:</strong> {product.productVendor}
        </DetailItem>
        <DetailItem>
          <strong>Product Name:</strong> {product.productName}
        </DetailItem>
        <DetailItem>
          <strong>Quantity In Stock:</strong> {product.quantityInStock}
        </DetailItem>
        <DetailItem className="fullWidth">
          <strong>Product Description:</strong>
          <FullWidthWrapper>{product.productDescription}</FullWidthWrapper>
        </DetailItem>
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Product;
