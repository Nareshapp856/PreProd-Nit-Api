
class Product {
 
   String productName;
     double price;
   int quantity;

    
    public Product(String productName, double price, int quantity) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

   
    public void displayDetails() {
        System.out.println("Product Name: " + productName + ", Price: " + price + ", Quantity: " + quantity);
    }


    public void updatePrice(double newPrice) {
        this.price = newPrice;
    }

    public void checkAvailable(int stockQuantity) {
        boolean isAvailable = stockQuantity > 0 && stockQuantity <= quantity;
        System.out.println("Is the product available in stock? " + isAvailable);
    }
    public void calculateDiscount(double discountPercentage) {
        double discountedPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after " + discountPercentage + "% off: " + discountedPrice);
    }
}


public class Main {
    public static void main(String[] args) {
  
        Product product = new Product("Laptop", 1000.0, 57);

        System.out.println("Initial product details:");
        product.displayDetails();

        product.updatePrice(1200.0);
        System.out.println("\nAfter updating the price:");
        product.displayDetails();
        product.checkAvailable(10);
        product.calculateDiscount(10.0);
    }
}


