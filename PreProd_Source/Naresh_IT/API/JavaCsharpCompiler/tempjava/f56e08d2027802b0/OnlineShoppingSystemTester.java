class Product {
    protected String name;
    protected double price;

    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void displayInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Price: " + this.price);
    }

    public double calculateTotalCost(int quantity) {
        return quantity * this.price;
    }
}

class Electronics extends Product {
    private String brand;

    Electronics(String name, double price, String brand) {
        super(name, price);
        this.brand = brand;
    }

    
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Brand: " + this.brand);
    }
}

class Clothing extends Product {
    private String size;

    Clothing(String name, double price, String size) {
        super(name, price);
        this.size = size;
    }

    public void displayInfo() {
        super.displayInfo();
        System.out.println("Size: " + this.size);
    }
}

public class OnlineShoppingSystemTester {
    public static void main(String[] args) {
        Electronics e = new Electronics("Fan", 1200.0, "Usha");
        Clothing c = new Clothing("T-Shirt", 200.0, "32");

        System.out.println("Electronics Item Info:");
        e.displayInfo();
        System.out.println("Total Cost for 4 units: " + e.calculateTotalCost(4));

        System.out.println("\nClothing Item Info:");
        c.displayInfo();
        System.out.println("Total Cost for 4 units: " + c.calculateTotalCost(4));
    }
}
