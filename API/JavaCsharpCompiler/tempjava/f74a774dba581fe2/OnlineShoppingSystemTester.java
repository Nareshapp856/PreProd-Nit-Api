class Product{
    protected String name;
    protected double price;
public Product(String name,double price){
    this.name=name;
    this.price=price;
} 
public void displayInfo(){
    System.out.println("the product name:"+name);
    System.out.println("the product price:"+price);
    }
public double calculateTotalCost(int quantity){
    return price*quantity;
}
}
class Electronics extends Product{
    private String brand;
public Electronics(double price,String name,String brand){
    super(name,price);
    this.brand=brand;
}
public void displayInfo(){
    super.displayInfo();
    System.out.println("product brand:"+brand);
}
}
class Clothing extends Product{
    private String size;
public Clothing(String name,double price,String size){
    super(name,price);
    this.size=size;
}
public void displayInfo(){
    super.displayInfo();
    System.out.println("product size:"+size);
}
}
public class OnlineShoppingSystemTester{
public static void main(String[] args){
    Electronics e=new Electronics(720.5,"tshirt","roadster");
    Clothing c=new Clothing("roadster",720.5,"xl");
    e.displayInfo();
    c.displayInfo();
}
} 

