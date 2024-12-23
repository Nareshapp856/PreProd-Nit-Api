public class Product
{
    String ProductName;
    double price;
    int quantity;
    public void displayDetails()
    {
        System.out.println("Name of the Product"+ProductName);
        System.out.println("Name of the Product"+price);
        System.out.println("Name of the Product"+quantity);
    }
    public void updatePrice(double newPrice)
    {
        newPrice = price;
        System.out.println("New Price is : "+newPrice);
       
    }
    public void checkAvailable(int StockQuantity)
    {
        if(StockQuantity > 0 && StockQuantity <= quantity)
        {
            System.out.println("Product is Available : ");
        }
        else
         {
             System.out.println("Product is Not Available : ");
         }

    }
    public void calculateDiscount(double discountPer)
    {
       price = price - (price * (discountPer / 100));
       System.out.println("Discounted price is : "+price);
    }
    public static void main(String []args)
    {
        Product p1=new Product();
        p1.ProductName="Laptop";
        p1.price=20000.0;
        p1.quantity=57;
        p1.calculateDiscount(15);
        p1.updatePrice(45.50);
        p1.displayDetails();

    }


}