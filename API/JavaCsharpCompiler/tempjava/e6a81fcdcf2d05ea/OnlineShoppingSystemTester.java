class Product
{
    String name;
    double  price;
    public Product(String name,double price)
    {

        this.name=name;
        this.price=price;
    }
    public void displayInfo(String name,double price)
    {
        System.out.println("product name is "+name);
        System.out.println("product price is "+price);

    }
    public void calculateTotalCost(int quantity)
    {
        double totalCost=price*quantity;
        System.out.println("prosduct total cost is "+totalCost);
    }
}
class Electronics extends Product
{
    private String brand;
    public Electronics(String brand,String name,double price)
    {
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo(String brand, String name,double price)
    {
        System.out.println("product name is "+name);
        System.out.println("product price is "+price);
        System.out.println("product brand is "+brand);
    }
}

class Clothing extends Product{
    private String size;

    public Clothing(String size,String name,double price)
    {
        super( name,price);
        this.size=size;

    }
    public void displayInfo(String size, String name, double price)
    {
        System.out.println("product name is "+name);
        System.out.println("product price is "+price);
        System.out.println("prosduct size is "+size);
        

    }
}



public class OnlineShoppingSystemtester
{
    public static void main(String [] args)
    {
        Clothing c=new Clothing("M","shirt",400);
        c.displayInfo("M","shirt",400);
        Electronics e=new Electronics("HP","laptop",30000);
        e.displayInfo("HP","laptop",30000);
    } 

}