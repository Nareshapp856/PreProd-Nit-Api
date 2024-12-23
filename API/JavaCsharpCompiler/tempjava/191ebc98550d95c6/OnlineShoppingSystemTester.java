class Product
{
    protected String name;
    protected double price;

    public Product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }

    void displayInfo()
    {
        System.out.println("Product name:"+name);
        System.out.println("price:"+price);
    }
}
class Electronics extends Product
{
    private String brand;
    public Electronics(String name,double price,String brand)
    {
        super(name,price);
        this.brand=brand;
    }

    void displayInfo()
    {
        System.out.println("Brand"+brand);
    }
}

class Clothing extends Product
{
    private String size;
    public Clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }

    void displayInfo()
    {
        super(displayInfo());
        System.out.println("Size:"+size);
    }

}



public class OnlineShoppingSystemTester
{
    public static void main (String[] args)
    {
       Clothing c=new Clothing("Shirt",2000.0,"XL");
       c.displayInfo();
    }
}