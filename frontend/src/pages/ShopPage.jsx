import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8001';
const API = `${API_BASE}/api`;

const AVAILABLE_COLORS = ['Black', 'Gold', 'Deep Red', 'White', 'Gray'];

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart(product, selectedColor, 1);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Quick View</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="font-display text-3xl font-bold mb-2">{product.name}</h2>
            <p className="font-accent text-3xl text-primary font-bold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-6 flex-grow">{product.description}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-accent uppercase tracking-wider mb-2">
                  Select Color
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded border-2 transition-all ${
                        selectedColor === color
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-accent uppercase tracking-wider"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Link to={`/product/${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-accent uppercase tracking-wider"
                    size="lg"
                  >
                    Full Details
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Category: <span className="text-foreground">{product.category}</span></p>
                <p>In Stock: <span className="text-primary font-semibold">{product.stock} units</span></p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedColor]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedColor === 'all'
        ? `${API}/products`
        : `${API}/products?color=${selectedColor}`;
      const response = await axios.get(url);
      let sorted = [...response.data];

      // Apply sorting
      if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      setProducts(sorted);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProducts();
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Our Collection
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our exclusive range of luxury sneakers, crafted for the discerning enthusiast
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="font-accent uppercase tracking-wider text-sm text-muted-foreground">
              Filter by Color:
            </span>
            <Button
              variant={selectedColor === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedColor('all')}
              className={selectedColor === 'all' ? 'bg-primary text-primary-foreground' : ''}
            >
              All
            </Button>
            {AVAILABLE_COLORS.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-2 ${
                  selectedColor === color ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                {color}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-accent uppercase tracking-wider text-sm text-muted-foreground">
              Sort:
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden bg-card">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products found with the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden bg-card border-border hover-scale group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-accent text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full border-2 border-border"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <div className="w-5 h-5 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xs">
                          +{product.colors.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default ShopPage;
