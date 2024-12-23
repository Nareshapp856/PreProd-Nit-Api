class Product{
    protected String name;
    protected double price;
    public Product(String name,double price){
        this.name=name;
        this.price=price;
    }
    public void displayInfo(){
        System.out.println("name:"+name);
        System.out.println("Price:"+price);
    }
    public void calculateTotalCost(int quantity){
        double TotalCost=price*(double)quantity;
        System.out.println("TotalCost:"+TotalCost);
    }
}
class Electronics extends Product{
    private String brand;
    public Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo(){
         System.out.println("name:"+name);
        System.out.println("Price:"+price);
        System.out.println("brand:"+brand);
    }
}
class Clothing extends Product{
    private String size;
    public Clothing(String name,double price,String size){
        super(name,price);
        this.size=size;
    }
    public void displayInfo(){
        System.out.println("name:"+name);
        System.out.println("Price:"+price);
        System.out.println("size:"+size);
       
    }

}
public class OnlineShoppingSystemTester{
    public static void main(String[] args){
        Electronics e=new Electronics("bike",90000,"BMW");
        e.displayInfo();
        e.calculateTotalCost(2);
      //  System.out.println(calculateTotalCos(2));
         System.out.println("");
        Clothing c=new Clothing("shart",899,"nike");
        c.displayInfo();
        c.calculateTotalCost(2);
    }
}