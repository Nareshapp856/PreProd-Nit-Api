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
        System.out.println("Name: "+name);
        System.out.println("Price: "+price);    
    }

    public double calculateTotalCost(int quantity)
    {
       double total = quantity*price;
       return total;
    }
}

class Electronics extends Product
{
    private String brand;

    public Electronics(String name, double price, String brand)
    {
        super(name, price);
        this.brand = brand;
    }

    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Brand: "+brand);
    }
}

class Clothing extends Product
{
    private String size;
    public Clothing(String name, double price, String size)
    {
        super(name, price);
        this.size = size;
    }

    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Size: "+size);
    }
}


public class OnlineShoppingSystemTester
{
    public static void main(String []args)
    {
        Electronics e1 = new Electronics("Laptop",10000.0,"Asus");
    e1.displayInfo();
    System.out.println("Total price = "+e1.calculateTotalCost(2));

    Clothing c1 = new Clothing("Jeans", 500.0, "M");
    c1.displayInfo();
    System.out.println("Total price = "+c1.calculateTotalCost(2));
    
    }
}