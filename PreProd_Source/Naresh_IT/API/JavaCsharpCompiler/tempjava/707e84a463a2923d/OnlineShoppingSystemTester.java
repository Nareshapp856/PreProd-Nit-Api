class Product {  
    protected String name;  
    protected double price;  

      
    public Product(String name, double price) {  
        this.name = name;  
        this.price = price;  
    }  

   
    public void displayInfo() {  
        System.out.println("Product Name: " + name);  
        System.out.println("Product Price: $" + price);  
    }  

    
    public double calculateTotalCost(int quantity) {  
        return price * quantity;  
    }  
}  

 
class Electronics extends Product {  
    private String brand;  
 
    public Electronics(String name, double price, String brand) {  
        super(name, price);  
        this.brand = brand;  
    }  

      
    @Override  
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

  
    @Override  
    public void displayInfo() {  
        super.displayInfo();   
        System.out.println("Size: " + size);  
    }  
}  

 
public class OnlineShoppingSystemTester {  
    public static void main(String[] args) {  
         
        Electronics laptop = new Electronics("Laptop", 999.99, "Dell");  
        Clothing shirt = new Clothing("T-Shirt", 19.99, "M");  

        
        System.out.println("Electronics Product Info:");  
        laptop.displayInfo();  
        System.out.println("\nClothing Product Info:");  
        shirt.displayInfo();  

         
        int laptopQuantity = 2;  
        int shirtQuantity = 3;  

        System.out.println("\nTotal Cost for " + laptopQuantity + " Laptops: $" + laptop.calculateTotalCost(laptopQuantity));  
        System.out.println("Total Cost for " + shirtQuantity + " T-Shirts: $" + shirt.calculateTotalCost(shirtQuantity));  
    }  
}  
