class Product {
    protected String name;
    protected double price;
    Product(String name,double price){
        this.name=name;
        this.price=price;
    }
    public void displayInfo(){
        System.out.println("Name of Product "+name+" Price of Product "+price);
    }
    public void calculateTotalCost(int quantity){
        price=price*quantity;
        System.out.println("Quantity :"+quantity+" Price :"+price);
    }
}
class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo(){
        System.out.println("Name of Product :"+name+" Price of Product :"+price+" Brand : "+brand);
    }
    
}
class Clothing extends Product{
    private int size;
    public Clothing(String name,double price,int size){
        super(name,price);
        this.size=size;
    }
     public void displayInfo(){
        System.out.println("Name of Product :"+name+" Price of Product :"+price+" Product size : "+size);
    }
}
public class OnlineShoppingSystemTester{
    public static void main(String[] args){
        Electronics e=new Electronics("Laptop",55000.00,"Apple");
        e.displayInfo();
        e.calculateTotalCost(5);
        Clothing c1=new Clothing("BlueShirt",2500.00,42);
       c1.displayInfo();
        c1.calculateTotalCost(5);

    }
}