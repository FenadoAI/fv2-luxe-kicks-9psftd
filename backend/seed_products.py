"""Seed database with sample luxury sneaker products."""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import uuid
from datetime import datetime, timezone

load_dotenv(Path(__file__).parent / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

# Sample luxury sneaker products
PRODUCTS = [
    {
        "name": "Midnight Gold Edition",
        "description": "Limited edition luxury sneaker featuring premium black leather with gold accents. Handcrafted for the discerning collector.",
        "price": 399.99,
        "colors": ["Black", "Gold"],
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80"
        ],
        "category": "Premium Collection",
        "featured": True,
        "stock": 25
    },
    {
        "name": "Crimson Royale",
        "description": "Bold deep red statement piece with black trim. Exudes sophistication and power in every step.",
        "price": 449.99,
        "colors": ["Deep Red", "Black"],
        "images": [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
        ],
        "category": "Signature Series",
        "featured": True,
        "stock": 18
    },
    {
        "name": "Obsidian Luxe",
        "description": "Pure black perfection. Minimalist design meets maximum luxury in this timeless masterpiece.",
        "price": 379.99,
        "colors": ["Black"],
        "images": [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80"
        ],
        "category": "Classic Line",
        "featured": True,
        "stock": 30
    },
    {
        "name": "Golden Era",
        "description": "Opulent gold finish that commands attention. For those who refuse to blend in with the crowd.",
        "price": 499.99,
        "colors": ["Gold", "Black"],
        "images": [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"
        ],
        "category": "Exclusive Collection",
        "featured": True,
        "stock": 12
    },
    {
        "name": "Shadow Elite",
        "description": "Stealth luxury with subtle gold highlights. Understated elegance for the refined taste.",
        "price": 359.99,
        "colors": ["Black", "Gold", "Gray"],
        "images": [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
            "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80"
        ],
        "category": "Urban Elite",
        "featured": False,
        "stock": 40
    },
    {
        "name": "Burgundy Prestige",
        "description": "Deep red wine-inspired luxury sneaker. Sophisticated color palette for the connoisseur.",
        "price": 429.99,
        "colors": ["Deep Red", "Black", "Gold"],
        "images": [
            "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
        ],
        "category": "Heritage Collection",
        "featured": False,
        "stock": 22
    },
    {
        "name": "Platinum Monolith",
        "description": "Sleek white and gold combination. Clean lines and premium materials define this modern classic.",
        "price": 389.99,
        "colors": ["White", "Gold"],
        "images": [
            "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
            "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80"
        ],
        "category": "Contemporary Line",
        "featured": False,
        "stock": 35
    },
    {
        "name": "Carbon Fiber Pro",
        "description": "High-tech materials meet luxury design. Black and gray masterpiece for the modern athlete.",
        "price": 469.99,
        "colors": ["Black", "Gray"],
        "images": [
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
            "https://images.unsplash.com/photo-1612902376933-b1e0b4c8f48b?w=800&q=80"
        ],
        "category": "Performance Luxury",
        "featured": False,
        "stock": 28
    },
    {
        "name": "Ruby Supreme",
        "description": "Vibrant deep red with premium leather construction. Bold statement for the confident individual.",
        "price": 419.99,
        "colors": ["Deep Red", "Gold"],
        "images": [
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80",
            "https://images.unsplash.com/photo-1600054800747-be294a6a0d26?w=800&q=80"
        ],
        "category": "Limited Edition",
        "featured": False,
        "stock": 15
    },
    {
        "name": "Noir Elegance",
        "description": "Ultimate black luxury sneaker. Timeless design that transcends trends and seasons.",
        "price": 349.99,
        "colors": ["Black"],
        "images": [
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80",
            "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=80"
        ],
        "category": "Essential Collection",
        "featured": False,
        "stock": 50
    },
]


async def seed_products():
    """Seed the database with sample products."""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    print(f"Connecting to MongoDB at {MONGO_URL}...")
    print(f"Using database: {DB_NAME}")

    # Clear existing products
    result = await db.products.delete_many({})
    print(f"Cleared {result.deleted_count} existing products")

    # Insert new products
    products_to_insert = []
    for product in PRODUCTS:
        product_doc = {
            "id": str(uuid.uuid4()),
            "name": product["name"],
            "description": product["description"],
            "price": product["price"],
            "colors": product["colors"],
            "images": product["images"],
            "category": product["category"],
            "featured": product["featured"],
            "stock": product["stock"],
            "created_at": datetime.now(timezone.utc)
        }
        products_to_insert.append(product_doc)

    result = await db.products.insert_many(products_to_insert)
    print(f"Successfully inserted {len(result.inserted_ids)} products")

    # Print summary
    print("\n=== Products Summary ===")
    featured_count = sum(1 for p in PRODUCTS if p["featured"])
    print(f"Total Products: {len(PRODUCTS)}")
    print(f"Featured Products: {featured_count}")
    print(f"Categories: {len(set(p['category'] for p in PRODUCTS))}")

    client.close()
    print("\nDatabase seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed_products())
