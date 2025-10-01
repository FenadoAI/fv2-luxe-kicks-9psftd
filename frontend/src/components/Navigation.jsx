import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Menu, X, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, getCartCount, getCartTotal, removeFromCart, updateQuantity } = useCart();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="font-display text-primary-foreground font-bold text-xl">L</span>
            </div>
            <span className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
              Luxe<span className="text-primary">Kick</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-accent uppercase tracking-wider text-sm transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover:border-primary hover:text-primary"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg bg-card border-border">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl">Shopping Cart</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <Button
                      onClick={() => setCartOpen(false)}
                      className="bg-primary text-primary-foreground"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto py-6 space-y-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              Color: {item.color}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromCart(item.product.id, item.color)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <p className="text-sm font-semibold text-primary">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-accent text-lg font-semibold">Total</span>
                        <span className="font-accent text-2xl font-bold text-primary">
                          ${getCartTotal().toFixed(2)}
                        </span>
                      </div>
                      <Link to="/checkout" className="block" onClick={() => setCartOpen(false)}>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-accent uppercase tracking-wider py-6"
                          size="lg"
                        >
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-accent uppercase tracking-wider text-sm transition-colors ${
                    isActive(link.path)
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
