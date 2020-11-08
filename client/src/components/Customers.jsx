import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { getCostumers } from "../utils/api";
import Customer from "./Customer";
import CustomersFilters from "./CustomersFilters";
import { List } from "./shared";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getCostumers(filters)
      .then((res) => {
        setLoading(false);

        setCustomers(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [filters]);

  return (
    <Fragment>
      <CustomersFilters onApplyFilters={setFilters} />
      <List>
        {loading && <p>Loading...</p>}
        {!loading && !customers.length && <p>No Customers</p>}
        {!loading &&
          customers.map((customer) => (
            <Customer key={customer.customerNumber} customer={customer} />
          ))}
      </List>
    </Fragment>
  );
};

export default Customers;
