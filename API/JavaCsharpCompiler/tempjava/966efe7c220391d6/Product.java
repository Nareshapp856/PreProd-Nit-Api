public class Product {
    private String productName;
    private double price;
    private int quantity;

    public Product(String productName, double price, int quantity) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public void displayDetails() {
        System.out.println("Product Name: " + productName + ", Price: " + price + ", Quantity: " + quantity);
    }

    public void updatePrice(double newPrice) {
        price = newPrice;
    }

    public void checkAvailable(int stockQuantity) {
        if (stockQuantity > 0 && stockQuantity <= quantity) {
            System.out.println("Is the product available in stock? true");
        } 
		else
		 {
            System.out.println("Is the product available in stock? false");
        }
    }

    public void calculateDiscount(double discountPercentage) {
        double newPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after " + discountPercentage + "% off: " + newPrice);
    }

    public static void main(String[] args) {
        Product product = new Product("Laptop", 1000.0, 57);
        product.displayDetails();
        System.out.println("After updating the price: ");
        product.updatePrice(1200.0);
        product.displayDetails();

	}
}
