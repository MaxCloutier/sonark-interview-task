import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { getCostumers } from "../utils/api";
import Customer from "./Customer";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCostumers()
      .then((res) => {
        setLoading(false);

        setCustomers(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading && <p>Loading...</p>}
      {!loading &&
        customers.map((customer) => (
          <Customer key={customer.customerNumber} customer={customer} />
        ))}
    </Fragment>
  );
};

export default Customers;
