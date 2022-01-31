import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";

export const sum = (array) =>
  array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

export const filterData = ({ data }) => {
  const result = [];
  const groupResult = groupBy(orderBy(data, 'created','asc'), "projectId");

  for (const [projectId, transactions] of Object.entries(groupResult)) {
    const total = sum(transactions.map(({ amount }) => amount));

    result.push({ projectId, total, transactions });
  }
  return result;
};

export const filterGatewayData = (data) => {
  const result = [];
  const groupResult = groupBy(data, "gatewayId");

  for (const [gatewayId, transactions] of Object.entries(groupResult)) {
    const total = sum(transactions.map(({ amount }) => amount));

    result.push({ gatewayId, total, transactions });
  }
  return result;
};

export const formatAmount = (amount) => amount.toFixed(2) + " USD";
