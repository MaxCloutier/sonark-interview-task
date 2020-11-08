import cx from "classnames";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { ListItem } from "./shared";
import OrderDetails from "./OrderDetails";
import { CaretDownFill, CaretUpFill } from "grommet-icons";

const Cell = styled.span`
  width: calc(33.3% - 11px);

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

const ExpandIconCell = styled.span`
  width: 33px;
  text-align: right;
  padding-top: 2px;
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
        <ExpandIconCell></ExpandIconCell>
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
            <ExpandIconCell>
              {expandedOrders[order.orderNumber] ? (
                <CaretDownFill size="20" />
              ) : (
                <CaretUpFill size="20" />
              )}
            </ExpandIconCell>
          </ListItem>
          {expandedOrders[order.orderNumber] && <OrderDetails order={order} />}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Orders;
