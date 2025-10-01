import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-card border-border">
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">No Order Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find your order details
            </p>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-primary text-primary-foreground"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 animate-fadeIn">
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-muted-foreground">
            Order ID: <span className="font-mono text-foreground">{order.id}</span>
          </p>
        </div>

        {/* Order Details */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Order Details</h2>
                <Badge className="mt-1 bg-accent text-accent-foreground">
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-20 rounded bg-muted flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Color: {item.color} | Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-green-500">FREE</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-accent font-semibold">Total</span>
                <span className="font-accent font-bold text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-8">
            <h3 className="font-display text-xl font-bold mb-4">Shipping Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{order.customer_info.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_info.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_info.city}, {order.customer_info.postal_code}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{order.customer_info.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{order.customer_info.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-8">
            <h3 className="font-display text-xl font-bold mb-4">Payment Method</h3>
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded">
              <CheckCircle className="w-6 h-6 text-primary" />
              <div>
                <p className="font-accent font-semibold">Cash on Delivery (COD)</p>
                <p className="text-sm text-muted-foreground">
                  Pay when you receive your order
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="font-display text-xl font-bold mb-4">What happens next?</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>We'll send you an email confirmation shortly</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Your order will be prepared for shipment</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>You'll receive tracking information once shipped</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Pay cash when your order arrives at your doorstep</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link to="/shop" className="flex-1 sm:flex-initial">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-accent uppercase tracking-wider"
              size="lg"
            >
              Continue Shopping
            </Button>
          </Link>
          <Link to="/" className="flex-1 sm:flex-initial">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-accent uppercase tracking-wider"
              size="lg"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
