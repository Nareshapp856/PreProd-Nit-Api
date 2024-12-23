
class Product {
    protected String name;
    protected double price;


    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

 
    public void displayInfo() {
        System.out.println("Product Name: " + name);
        System.out.println("Price: " + price);
    }

  
    public double calculateTotalCost(int quantity) {
        return price * quantity;
    }
}


class Electronics extends Product {
    private  String brand;

  
    public Electronics(String name, double price, String brand) {
        super(name, price);
        this.brand = brand;
    }

   
    
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Brand: " + brand);
    }
}


class Clothing extends Product {
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
        
        Electronics laptop = new Electronics("Laptop", 1200.50, "Dell");
        Clothing shirt = new Clothing("Shirt", 25.75, "M");

       
        System.out.println("Electronics Products:");
        laptop.displayInfo();
        System.out.println("Total Cost for 2 units: $" + laptop.calculateTotalCost(2));

        System.out.println("\nClothing Product Details:");
        shirt.displayInfo();
        System.out.println("Total Cost for 3 units: " + shirt.calculateTotalCost(3));
    }
}
