
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import OrderTable from '../../components/OrderTable';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const { getOrdersByUserId } = useStore();
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          <p className="text-gray-600 mb-8">Please log in to view your orders</p>
          <Link to="/login">
            <Button className="bg-bookblue hover:bg-blue-700">Login</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const userOrders = getOrdersByUserId(currentUser.id);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {userOrders.length > 0 ? (
          <OrderTable orders={userOrders} userType="user" />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">You haven't placed any orders yet</p>
            <Link to="/books">
              <Button className="bg-bookblue hover:bg-blue-700">Browse Books</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
