
class Product
{
    protected String name;
    protected double price;

    public Product(String name, double price) 
    {
        this.name = name;
        this.price = price;
    }

    public void displayInfo()
    {
        System.out.println("Name : "+name);
        System.out.println("Price : "+price);
    }

    public void calculateTotalCost(int quantity)
    {
        System.out.println("Total Price of "+quantity+" "+name+" is "+(price*quantity));
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

    @Override
    public void displayInfo()
    {
        System.out.println("Electronics Product Details");
        super.displayInfo();
        System.out.println("Brand : "+brand);
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

    @Override
    public void displayInfo()
    {
        System.out.println("Clothing Product Details");
        super.displayInfo();
        System.out.println("Size : "+size);
    }
}

public class OnlineShoppingSystemTester
{
    public static void main(String args[])
    {
        Electronics ele = new Electronics("Laptop",50000,"HP");

        Clothing cl = new Clothing("T-Shirts",250.55,"XL");

        ele.displayInfo();
        ele.calculateTotalCost(1);

        System.out.println();
        
        cl.displayInfo();
        cl.calculateTotalCost(2);
    }
}