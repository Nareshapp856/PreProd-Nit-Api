
class Product
{
    private String name;
    private double price;

    public  Product(String name,double price){
        this.name=name;
        this.price=price;
    }

    public void  displayInfo(){
        System.out.println("product name "+name);
        System.out.println("price is "+price);  
    }
    public int calculateTotalCost(int quantity){
        return (int)price*quantity;
    }
}
class  Electronics extends Product
{
    private String brand;

    public  Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;
    }
    public void  displayInfo(){
        super.displayInfo();
        System.out.println("product brand "+brand);

    }
}
class  Clothing extends Electronics
{
    private String size;

    public  Clothing(String name,double price,String brand,String size){
        super(name,price,brand);
        this.size=size;
    }
    public void  displayInfo(){
        super.displayInfo();
        System.out.println("product size "+size);
    }
}

public class OnlineShoppingSystemTester
{
public static void main(String[] args)
{
    Electronics E = new Electronics("Laptop",45000,"hp");
    E.displayInfo();
    System.out.println(E.calculateTotalCost(1));

}
}