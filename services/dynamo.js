import * as axios from 'axios';

export const getStatistics = async (amount, company) => {
  return await axios.get("http://localhost:3000/dynamo/getStatistics")
                              .then(response => response.data);
}

export const insertStatistic = async (storage, operation_type, operation_time) => {
  return await axios.post("http://localhost:3000/dynamo/insertStatistic", {
                                storage,
                                operation_type,
                                operation_time
                              })
                              .then(response => response.data);
}
