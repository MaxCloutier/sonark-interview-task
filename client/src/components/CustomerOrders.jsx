import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCostumerOrders } from "../utils/api";
import { List, ListItem, SectionTitle } from "./shared";
import Orders from "./Orders";

const CustomerOrders = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getCostumerOrders(id)
      .then((res) => {
        setLoading(false);

        setOrders(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <SectionTitle>Orders</SectionTitle>
          <List>
            {!orders.length ? (
              <ListItem>No Orders</ListItem>
            ) : (
              <Orders orders={orders} />
            )}
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CustomerOrders;
