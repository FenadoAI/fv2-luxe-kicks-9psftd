"""Test e-commerce API endpoints with real functionality."""

import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

# Load environment
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / ".env")

# API Configuration
API_BASE = os.getenv("API_BASE_URL", "http://localhost:8001")
API_URL = f"{API_BASE}/api"


def test_products_crud():
    """Test complete product CRUD workflow."""
    print("\n=== Testing Products API ===")

    # Create a test product
    print("\n1. Creating test product...")
    product_data = {
        "name": "Air Monarch Premium",
        "description": "Luxury leather sneaker with gold accents. Premium craftsmanship meets timeless design.",
        "price": 299.99,
        "colors": ["Black", "Gold", "Deep Red"],
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"
        ],
        "category": "Premium Sneakers",
        "featured": True,
        "stock": 50
    }

    response = requests.post(f"{API_URL}/products", json=product_data)
    assert response.status_code == 200, f"Failed to create product: {response.text}"
    product = response.json()
    product_id = product["id"]
    print(f"✓ Product created with ID: {product_id}")

    # Get all products
    print("\n2. Fetching all products...")
    response = requests.get(f"{API_URL}/products")
    assert response.status_code == 200
    products = response.json()
    assert len(products) > 0, "No products found"
    print(f"✓ Found {len(products)} products")

    # Filter by color
    print("\n3. Filtering products by color 'Black'...")
    response = requests.get(f"{API_URL}/products?color=Black")
    assert response.status_code == 200
    filtered = response.json()
    assert len(filtered) > 0, "Color filter returned no results"
    assert all("Black" in p["colors"] for p in filtered), "Color filter failed"
    print(f"✓ Found {len(filtered)} black products")

    # Get single product
    print("\n4. Fetching single product by ID...")
    response = requests.get(f"{API_URL}/products/{product_id}")
    assert response.status_code == 200
    product = response.json()
    assert product["name"] == "Air Monarch Premium"
    print(f"✓ Product retrieved: {product['name']}")

    # Update product
    print("\n5. Updating product price...")
    update_data = {"price": 349.99}
    response = requests.put(f"{API_URL}/products/{product_id}", json=update_data)
    assert response.status_code == 200
    updated = response.json()
    assert updated["price"] == 349.99, f"Price not updated: {updated['price']}"
    print(f"✓ Product price updated to ${updated['price']}")

    # Delete product
    print("\n6. Deleting test product...")
    response = requests.delete(f"{API_URL}/products/{product_id}")
    assert response.status_code == 200
    print("✓ Product deleted successfully")

    # Verify deletion
    print("\n7. Verifying product is deleted...")
    response = requests.get(f"{API_URL}/products/{product_id}")
    assert response.status_code == 404, "Product should not exist after deletion"
    print("✓ Product confirmed deleted")

    print("\n=== Products API Test PASSED ===")


def test_orders_crud():
    """Test complete order workflow."""
    print("\n=== Testing Orders API ===")

    # First create a product for the order
    print("\n1. Creating test product for order...")
    product_data = {
        "name": "Classic Black Sneaker",
        "description": "Timeless design with modern comfort",
        "price": 199.99,
        "colors": ["Black", "Gold"],
        "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
        "category": "Classic",
        "featured": False,
        "stock": 100
    }
    response = requests.post(f"{API_URL}/products", json=product_data)
    assert response.status_code == 200
    product = response.json()
    product_id = product["id"]
    print(f"✓ Product created: {product_id}")

    # Create an order
    print("\n2. Creating test order (COD)...")
    order_data = {
        "items": [
            {
                "product_id": product_id,
                "product_name": "Classic Black Sneaker",
                "quantity": 2,
                "price": 199.99,
                "color": "Black"
            }
        ],
        "total": 399.98,
        "customer_info": {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "+1234567890",
            "address": "123 Luxury Ave",
            "city": "New York",
            "postal_code": "10001"
        },
        "payment_method": "COD"
    }

    response = requests.post(f"{API_URL}/orders", json=order_data)
    assert response.status_code == 200, f"Failed to create order: {response.text}"
    order = response.json()
    order_id = order["id"]
    assert order["payment_method"] == "COD", "Payment method should be COD"
    assert order["status"] == "pending", "Initial status should be pending"
    print(f"✓ Order created with ID: {order_id}, Status: {order['status']}")

    # Get all orders
    print("\n3. Fetching all orders...")
    response = requests.get(f"{API_URL}/orders")
    assert response.status_code == 200
    orders = response.json()
    assert len(orders) > 0, "No orders found"
    print(f"✓ Found {len(orders)} orders")

    # Filter by email
    print("\n4. Filtering orders by customer email...")
    response = requests.get(f"{API_URL}/orders?email=john@example.com")
    assert response.status_code == 200
    filtered = response.json()
    assert len(filtered) > 0, "Email filter returned no results"
    assert all(o["customer_info"]["email"] == "john@example.com" for o in filtered)
    print(f"✓ Found {len(filtered)} orders for john@example.com")

    # Get single order
    print("\n5. Fetching single order by ID...")
    response = requests.get(f"{API_URL}/orders/{order_id}")
    assert response.status_code == 200
    order = response.json()
    assert order["total"] == 399.98
    print(f"✓ Order retrieved: Total ${order['total']}")

    # Update order status
    print("\n6. Updating order status to 'confirmed'...")
    status_update = {"status": "confirmed"}
    response = requests.patch(f"{API_URL}/orders/{order_id}/status", json=status_update)
    assert response.status_code == 200
    updated = response.json()
    assert updated["status"] == "confirmed", f"Status not updated: {updated['status']}"
    print(f"✓ Order status updated to: {updated['status']}")

    # Clean up
    print("\n7. Cleaning up test data...")
    requests.delete(f"{API_URL}/products/{product_id}")
    print("✓ Test product deleted")

    print("\n=== Orders API Test PASSED ===")


def test_color_filtering_feature():
    """Test the critical color filtering feature."""
    print("\n=== Testing Color Filtering (Critical Feature) ===")

    # Create multiple products with different colors
    print("\n1. Creating products with various colors...")
    products_data = [
        {
            "name": "Black Gold Edition",
            "description": "Premium black with gold accents",
            "price": 299.99,
            "colors": ["Black", "Gold"],
            "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
            "category": "Premium",
            "stock": 20
        },
        {
            "name": "Deep Red Luxury",
            "description": "Bold deep red statement piece",
            "price": 349.99,
            "colors": ["Deep Red", "Black"],
            "images": ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"],
            "category": "Premium",
            "stock": 15
        },
        {
            "name": "Pure Gold Collection",
            "description": "Exclusive gold luxury sneaker",
            "price": 399.99,
            "colors": ["Gold"],
            "images": ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800"],
            "category": "Exclusive",
            "stock": 10
        }
    ]

    created_ids = []
    for product_data in products_data:
        response = requests.post(f"{API_URL}/products", json=product_data)
        assert response.status_code == 200
        created_ids.append(response.json()["id"])
    print(f"✓ Created {len(created_ids)} test products")

    # Test filtering by Black
    print("\n2. Testing filter: Black...")
    response = requests.get(f"{API_URL}/products?color=Black")
    assert response.status_code == 200
    black_products = response.json()
    assert len(black_products) >= 2, f"Expected at least 2 black products, got {len(black_products)}"
    print(f"✓ Black filter returned {len(black_products)} products")

    # Test filtering by Gold
    print("\n3. Testing filter: Gold...")
    response = requests.get(f"{API_URL}/products?color=Gold")
    assert response.status_code == 200
    gold_products = response.json()
    assert len(gold_products) >= 2, f"Expected at least 2 gold products, got {len(gold_products)}"
    print(f"✓ Gold filter returned {len(gold_products)} products")

    # Test filtering by Deep Red
    print("\n4. Testing filter: Deep Red...")
    response = requests.get(f"{API_URL}/products?color=Deep Red")
    assert response.status_code == 200
    red_products = response.json()
    assert len(red_products) >= 1, f"Expected at least 1 deep red product, got {len(red_products)}"
    print(f"✓ Deep Red filter returned {len(red_products)} products")

    # Clean up
    print("\n5. Cleaning up test products...")
    for pid in created_ids:
        requests.delete(f"{API_URL}/products/{pid}")
    print(f"✓ Deleted {len(created_ids)} test products")

    print("\n=== Color Filtering Test PASSED ===")


if __name__ == "__main__":
    print(f"\nTesting E-Commerce API at: {API_URL}")
    print("=" * 60)

    try:
        test_products_crud()
        test_orders_crud()
        test_color_filtering_feature()

        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED")
        print("=" * 60)
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
        sys.exit(1)
    except requests.exceptions.ConnectionError:
        print(f"\n❌ CONNECTION ERROR: Could not connect to {API_URL}")
        print("Make sure the backend server is running on port 8001")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ UNEXPECTED ERROR: {e}")
        sys.exit(1)
