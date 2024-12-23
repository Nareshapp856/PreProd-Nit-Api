public class Product {
    // Instance variables
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

    // Method to update the price of the product
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

    // Method to calculate the discounted price based on the given percentage
    public void calculateDiscount(double discountPercentage) {
        double discountedPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after " + discountPercentage + "% off: " + discountedPrice);
    }

    // Main method to execute the program
    public static void main(String[] args) {
        // Create an object of the Product class
        Product product = new Product("Laptop", 1000.0, 57);

        // Display product details
        product.displayDetails();

        // Update the price and display the updated details
        product.updatePrice(1200.0);
        System.out.println("\nAfter updating the price:");
        product.displayDetails();

        // Check if the product is available in stock
        product.checkAvailable(50);  // Example stock quantity

        // Calculate and display the discounted price
        product.calculateDiscount(10.0);  // Example 10% discount
    }
}
