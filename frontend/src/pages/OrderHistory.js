import React, { useContext, useEffect, useReducer } from 'react';
import MessageBox from '../Components/MessageBox';
import Loadingbox from '../Components/Loadingbox';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import utils from '../utils';
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const url = "https://mern-rhj0.onrender.com"
const OrderHistory = () => {
  const navigate = useNavigate();

  const { state, dispatch: newDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    order: {},
    error: '',
    loading: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(url +`/api/order/mine`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: utils(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <>
      <Helmet>
        <title>Order History </title>
      </Helmet>
      <h3>Order History</h3>

      {loading ? (
        <Loadingbox />
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
              {console.log('data: ', order.length)}
            {order.map((data) => (
                <tr key={data.id}>
                {console.log('data: ', data)}
                <td>{data._id}</td>
                <td>{data.createdAt.substring(0, 10)}</td>
                <td>{data.totalPrice.toFixed(2)}</td>
                <td>{data.isPaid ? data.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {data.isDelivered ? data.deliveredAt.substring(0, 10) : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                        navigate(`/order/${data._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderHistory;
