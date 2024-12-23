class Product
{
    protected String name;
    protected double price;

    public Product(String name, double price)
    {
        super();
        this.name = name;
        this.price = price;
    }
    public void  displayInfo()
    {
        System.out.println("Name :"+this.name);
        System.out.println("Price :"+this.price);
    }
    public double calculateTotalCost(int quantity)
    {
        return quantity*this.price ;
    }
}

class Electronics extends Product
{
    private String brand;
    public Electronics(String name, double price, String brand)
    {
        super(name,price);
        this.brand = brand;
    }
    public void  displayInfo()
    {
        super.displayInfo();
         System.out.println("Brand :"+this.brand);
    }
}

class Clothing extends Product
{
    private String size;
    public Clothing(String name, double price, String size)
    {
        super(name,price);
        this.size = size;
    }
    public void  displayInfo()
    {
        super.displayInfo();
         System.out.println("Size :"+this.size);
    }
}

public class OnlineShoppingSystemTester
{
    public static void main(String [] args)
    {
        Electronics electronics = new Electronics("Laptop",35000,"HP");
        Clothing clothing = new Clothing("Shirt",1200,"Adidas");

        electronics.displayInfo();
        System.out.println("Total Cost :"+electronics.calculateTotalCost(1));

       System.out.println(------------------------); 

        clothing.displayInfo();
        System.out.println("Total Cost :"+clothing.calculateTotalCost(2));

    }
}