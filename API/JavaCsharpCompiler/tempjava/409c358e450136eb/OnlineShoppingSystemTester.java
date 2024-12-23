
class Product {
    protected String name;
    protected double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void displayInfo() {
        System.out.println("Product Name: "+name);
        System.out.println("Price:"+price);
    }

    public double calculateTotalCost(int quantity) {
        return price * quantity;
    }
}
class Electronic extends Product
{
    private String brand;

    public Electronic(String name,double price,String brand){
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo(){
        System.out.println("Brand: "+brand);
    }
}
class Clothing extends Product
{
    private String size;
    public Clothing(String name,double price,String size){
        super(name,price);
        this.size=size;
    }
    public void displayInfo(){
        System.out.println("Size: "+size);
    }

}

public class OnlineShoppingSystemTester {
    public static void main(String[] args) {

Electronics laptop = new Electronics(Laptop, 1200.00, Dell);
Clothing tshirt = new Clothing(T-Shirt, 20.00, M);

        System.out.println("Electronics:");
        laptop.displayInfo();
        System.out.println("Total Cost for 3 laptops:" + laptop.calculateTotalCost(3));
        
        System.out.println();

        System.out.println("Clothing:");
        tshirt.displayInfo();
        System.out.println("Total Cost for 5 T-Shirts:" + tshirt.calculateTotalCost(5));
    }
}
