import * as axios from 'axios';

const url = process.env.NEXT_PUBLIC_SERVER || 'localhost:3000';

export const getStatistics = async (amount, company) => {
  return await axios.get(url + "/dynamo/getStatistics")
                              .then(response => response.data);
}

export const insertStatistic = async (storage, operation_type, operation_time) => {
  return await axios.post(url + "/dynamo/insertStatistic", {
                                storage,
                                operation_type,
                                operation_time
                              })
                              .then(response => response.data);
}
