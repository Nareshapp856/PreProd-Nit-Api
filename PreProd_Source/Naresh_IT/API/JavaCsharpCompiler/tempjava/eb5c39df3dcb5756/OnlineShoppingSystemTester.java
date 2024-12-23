public class Product {
    protected String name;
    protected double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void displayInfo() {
        System.out.println("Product Name: " + name);
        System.out.println("Price: $" + price);
    }

    public double calculateTotalCost(int quantity) {
        return price * quantity;
    }
}

public class Electronics extends Product {
    private String brand;

    public Electronics(String name, double price, String brand) {
        super(name, price);
        this.brand = brand;
    }
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Brand: " + brand);
    }
}

public class Clothing extends Product {
    private String size;

    public Clothing(String name, double price, String size) {
        super(name, price);
        this.size = size;
    }
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Size: " + size);
    }
}

public class OnlineShoppingSystemTester {
    public static void main(String[] args) {
        Electronics phone = new Electronics("Smartphone", 699.99, "Samsung");
        Clothing shirt = new Clothing("T-Shirt", 19.99, "L");

        System.out.println("Electronics Product:");
        phone.displayInfo();
        System.out.println();

        System.out.println("Clothing Product:");
        shirt.displayInfo();
        System.out.println();

        int phoneQuantity = 3;
        int shirtQuantity = 5;

        System.out.println("Total cost for " + phoneQuantity + " phones: " + phone.calculateTotalCost(phoneQuantity));
        System.out.println("Total cost for " + shirtQuantity + " shirts: " + shirt.calculateTotalCost(shirtQuantity));
    }
}
