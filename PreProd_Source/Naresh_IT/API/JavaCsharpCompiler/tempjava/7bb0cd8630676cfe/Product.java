
class Product {
    
    String productName;
    double price;
    int quantity;

    // Constructor to initialize the product details
    public Product(String productName, double price, int quantity) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    // Method to display product details
    public void displayDetails() {
        System.out.println("Product Name: " + productName + ", Price: " + price + ", Quantity: " + quantity);
    }

    // Method to update the product price
    public void updatePrice(double newPrice) {
        this.price = newPrice;
    }

    // Method to check if the product is available in stock
    public void checkAvailable(int stockQuantity) {
        if (stockQuantity > 0 && stockQuantity <= quantity) {
            System.out.println("Is the product available in stock? true");
        } else {
            System.out.println("Is the product available in stock? false");
        }
    }

    // Method to calculate the discounted price
    public void calculateDiscount(double discountPercentage) {
        double newPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after " + discountPercentage + "% off: " + newPrice);
    }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("Laptop", 1000.0, 57);
        product.displayDetails();
        product.updatePrice(1200.0);
        System.out.println("\nAfter updating the price:");
        product.displayDetails();
        product.checkAvailable(50);
        product.calculateDiscount(10);
    }
}
