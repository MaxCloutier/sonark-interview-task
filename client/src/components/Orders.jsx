import cx from "classnames";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { ListItem } from "./shared";
import OrderDetails from "./OrderDetails";

const Cell = styled.span`
  width: 33.3%;

  &.header,
  &.orderNumber {
    font-weight: 600;
  }

  &.orderDate {
    text-align: right;
  }

  &.orderStatus {
    text-align: center;
  }
`;

const Orders = ({ orders }) => {
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleExpand = (orderNumber) => {
    setExpandedOrders({
      ...expandedOrders,
      [orderNumber]: !expandedOrders[orderNumber],
    });
  };

  return (
    <Fragment>
      <ListItem className="header">
        <Cell className="orderNumber header">Order Number</Cell>
        <Cell className="orderStatus header">Order Status</Cell>
        <Cell className="orderDate header">Order Date</Cell>
      </ListItem>
      {orders.map((order) => (
        <Fragment key={order.orderNumber}>
          <ListItem
            className={cx({
              expanded: expandedOrders[order.orderNumber],
            })}
            onClick={() => toggleExpand(order.orderNumber)}
          >
            <Cell className="orderNumber">{order.orderNumber}</Cell>
            <Cell className="orderStatus">{order.status}</Cell>
            <Cell className="orderDate">{order.orderDate}</Cell>
          </ListItem>
          {expandedOrders[order.orderNumber] && <OrderDetails order={order} />}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Orders;
