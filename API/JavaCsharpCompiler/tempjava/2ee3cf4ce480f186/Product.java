public class Product {
    String productName;
    double price;
    int quantity;

    public void displayDetails() {
        System.out.println("Product Name: " + productName + ", Price: " + price + ", Quantity: " + quantity);
    }

    public void updatePrice(double newPrice) {
        price = newPrice;
    }

    public void checkAvailable(int stockQuantity) {
        if (stockQuantity > 0 && stockQuantity <= quantity) {
            System.out.println("Is the product available in stock? true");
        } else {
            System.out.println("Is the product available in stock? false");
        }
    }

    public void calculateDiscount(double discPercentage) {
        double newPrice = price - (price * (discPercentage / 100));
        System.out.println("Discounted Price after " + discPercentage + "% off: " + newPrice);
    }

    public static void main(String[] args) {
        Product product = new Product();
        
        product.productName = "mobile";
        product.price = 100.0;
        product.quantity = 48;
        product.displayDetails();
        
        product.updatePrice(300.0);
        System.out.println("After updating the price:");
        product.displayDetails();
        
        product.checkAvailable(0);
        
        product.calculateDiscount(20);
    }
}
