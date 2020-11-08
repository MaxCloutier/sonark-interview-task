import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getCostumer } from "../utils/api";
import { useHistory } from "react-router-dom";
import CustomerOrders from "../components/CustomerOrders";
import { SectionTitle, Details, DetailItem } from "../components/shared";
import { FormPrevious } from "grommet-icons";

const Wrapper = styled.section``;

const Back = styled.a`
  color: #252525;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  transition: color 0.3s;

  &:hover {
    color: #717171;
  }
`;

const CustomerPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  // customerNumber: 103
  // salesRepEmployeeNumber: 1370
  // state

  useEffect(() => {
    getCostumer(id)
      .then((res) => {
        setLoading(false);

        setCustomer(res);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Back onClick={() => history.push("/")}>
        <FormPrevious size="20" /> Back to List
      </Back>
      {error && (
        <Wrapper>
          <SectionTitle>{error}</SectionTitle>
        </Wrapper>
      )}
      {customer && (
        <Fragment>
          <Wrapper>
            <SectionTitle>{customer.customerName}</SectionTitle>
            <Details>
              <DetailItem>
                <strong>Customer Number:</strong> {customer.customerNumber}
              </DetailItem>
              <DetailItem>
                <strong>Address:</strong> {customer.formatedAddress}
              </DetailItem>
              <DetailItem>
                <strong>Contact:</strong> {customer.contactFirstName}{" "}
                {customer.contactLastName}
              </DetailItem>
              <DetailItem>
                <strong>Phone Number:</strong> {customer.phone}
              </DetailItem>
              <DetailItem>
                <strong>Credit Limit:</strong> {customer.creditLimit}
              </DetailItem>
              <DetailItem>
                <strong>Sales Rep Employee Number:</strong>{" "}
                {customer.salesRepEmployeeNumber}
              </DetailItem>
            </Details>
          </Wrapper>
          <CustomerOrders />
        </Fragment>
      )}
    </Fragment>
  );
};

export default CustomerPage;
