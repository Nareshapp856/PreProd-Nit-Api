public class Product {
    String productName = "Laptop";
    double price = 1000;
    int quantity = 57;

    public void displayDetails() {
        System.out.println("Product Name: " + productName + ", Price: " + price + ", Quantity: " + quantity);
    }

    public void updatePrice(double newPrice) {
        this.price = newPrice;
    }

    public void checkAvailable(int stockQuantity) {
        if (stockQuantity > 0 && stockQuantity <= quantity) {
            System.out.println("Is the product available in stock? true");
        } else {
            System.out.println("Is the product available in stock? false");
        }
    }
    public void calculateDiscount(double discountPercentage) {
        double newPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after " + discountPercentage + "% off: " + newPrice);
    }

    public static void main(String[] args) {
        Product product1 = new Product();
        product1.displayDetails();
        product1.updatePrice(1200.0);
        System.out.println("After updating the price:");
        product1.displayDetails();
        product1.checkAvailable(30);  
        product1.calculateDiscount(10); 
    }
}
