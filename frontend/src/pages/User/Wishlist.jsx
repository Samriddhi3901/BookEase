
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Wishlist= () => {
  const { books, wishlist, removeFromWishlist, addToCart } = useStore();
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
          <p className="text-gray-600 mb-8">Please log in to view your wishlist</p>
          <Link to="/login">
            <Button className="bg-bookblue hover:bg-blue-700">Login</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get wishlist items for current user
  const userWishlistItems = wishlist.filter(item => item.userId === currentUser.id);
  // Get full book details for each wishlist item
  const wishlistBooks = userWishlistItems.map(item => 
    books.find(book => book.id === item.bookId)
  ).filter(book => book !== undefined);
  
  if (wishlistBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
          <p className="text-gray-600 mb-8">Your wishlist is empty</p>
          <Link to="/books">
            <Button className="bg-bookblue hover:bg-blue-700">Browse Books</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {wishlistBooks.map(book => book && (
            <Card key={book.id} className="overflow-hidden">
              <div className="flex h-full">
                <div className="w-1/3 p-4">
                  <Link to={`/book/${book.id}`}>
                    <img 
                      src={book.imageUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                
                <CardContent className="w-2/3 p-4 flex flex-col">
                  <Link to={`/book/${book.id}`} className="hover:underline">
                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
                  <p className="text-lg font-bold mt-1 mb-4">${book.price.toFixed(2)}</p>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeFromWishlist(currentUser.id, book.id)}
                      className="flex-1"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(book)}
                      className="flex-1 bg-bookblue hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
