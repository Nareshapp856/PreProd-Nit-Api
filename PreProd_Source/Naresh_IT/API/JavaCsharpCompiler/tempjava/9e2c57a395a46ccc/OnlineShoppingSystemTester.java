import java.util.Scanner;

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
    @SuppressWarnings("unused")
	public static void main(String[] args) 
    {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter details for Electronics Product:");
        System.out.print("Enter Product Name: ");
        String electronicsName = scanner.nextLine();

        System.out.print("Enter Product Price: ");
        double electronicsPrice = scanner.nextDouble();
        scanner.nextLine();

        System.out.print("Enter Brand: ");
        String electronicsBrand = scanner.nextLine();

        Electronics laptop = new Electronics(electronicsName, electronicsPrice, electronicsBrand);

        System.out.println("\nElectronics Product Information:");
        laptop.displayInfo();

        System.out.print("Enter quantity for "+electronicsName+":");
        int laptopQuantity = scanner.nextInt();
        System.out.println("Total cost for " + laptopQuantity + " Laptop(s): $" + laptop.calculateTotalCost(laptopQuantity));

        System.out.println("\nEnter details for Clothing Product:");
        System.out.print("Enter Product Name: ");
        String clothName = scanner.nextLine();
        String clothName1 = scanner.nextLine();

        System.out.print("Enter Product Price: ");
        double clothPrice = scanner.nextDouble();
        scanner.nextLine();

        System.out.print("Enter Brand: ");
        String clothSize = scanner.nextLine();

        Clothing tshirt = new Clothing(clothName, clothPrice, clothSize);

        System.out.println("\nClothing Product Information:");
        tshirt.displayInfo();

        System.out.print("Enter quantity for "+clothName+":");
        int tshirtQuantity = scanner.nextInt();
        System.out.println("Total cost for " + tshirtQuantity + " T-Shirt(s): $" + tshirt.calculateTotalCost(tshirtQuantity));

        scanner.close();
    }
}
