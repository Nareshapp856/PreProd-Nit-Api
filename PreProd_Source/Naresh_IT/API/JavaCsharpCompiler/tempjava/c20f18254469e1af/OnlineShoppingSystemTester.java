class Product{
    protected String name;
    protected double price;
     
     public Product(String name,double price){
        this.name=name;
        this.price=price;
     }
     public void displayInfo(){
        System.out.println("Product name is :"+name);
        System.out.println("Product price is :"+price);
     }

     public double calculateTotalCost(int quantity){
      return quantity*price;
     }

}

class Electronics extends Product{
   private String brand;
   public Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;
     }
public void displayInfo(){
   super.displayInfo();
     System.out.println("product brand is :"+brand);
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
     System.out.println("product size is :"+size);
}
}

public class OnlineShoppingSystemTester{
   public static void main(String[] args){
     Electronics es= new Electronics("earbus",1000.0,"Boat");
     es.displayInfo();
    System.out.println( es.calculateTotalCost(5));

     Clothing  cl =new  Clothing("shirt",800.0,"Zara");
       es.displayInfo();
    System.out.println( es.calculateTotalCost(5));
   }
}