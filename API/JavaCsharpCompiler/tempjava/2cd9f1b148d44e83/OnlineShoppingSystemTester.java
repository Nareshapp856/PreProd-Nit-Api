class Product 
{
    protected String Name;
    protected double Price;

    public Product(String Name, double Price) 
    {
        this.Name = Name;
        this.Price = Price;
    }

    public void displayInfo() 
    {
        System.out.println("Product Name: " + Name);
        System.out.println("Product Price: $" + Price);
    }

    public int calculateTotalCost(int Quantity) 
    {
        return (int) (Quantity * Price);
    }
}

class Electronics extends Product 
{
    private String Brand;

    public Electronics(String Name, double Price, String Brand) 
    {
        super(Name, Price);
        this.Brand = Brand;
    }

    @Override
    public void displayInfo() 
    {
        super.displayInfo();
        System.out.println("Brand: " + Brand);
    }
}

class Clothing extends Product 
{
    private String Size;

    public Clothing(String Name, double Price, String Size) 
    {
        super(Name, Price);
        this.Size = Size;
    }

    @Override
    public void displayInfo() 
    {
        super.displayInfo();
        System.out.println("Size: " + Size);
    }
}

public class OnlineShoppingSystemTester 
{
	public static void main(String[] args) 
    {


        Electronics laptop = new Electronics("Laptop", 50000, "Dell");

        System.out.println("\nElectronics Product Information:");
        laptop.displayInfo();


        Clothing tshirt = new Clothing(clothName, clothPrice, clothSize);

        System.out.println("\nClothing Product Information:");
        tshirt.displayInfo();


    }
}
