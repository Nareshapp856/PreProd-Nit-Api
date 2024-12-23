public class Product
{
    public void displayDetails()
    {
        String ProductName;
        double price;
        double quantity;
    }
    public void updatePrice(double newPrice)
    {
        updatePrice+=newPrice;
        //stockQuantity+=Quantity;
        System.out.println("After updating the price:");
    }
    public void checkAvailable(int stockQuantity)
    {
        if(stockQuantity>=Quantity)
        {
            stockQuantity+=Quantity;
            System.out.println("product is available");
        }
        else
        {
            System.out.println("product is not available");
        }
    }
    public void calculateDiscount(double discountPercentage)
    {
    newPrice = price - (price * (discountPercentage / 100));
    System.out.println("After calculating the discount");
    }
    public static void main(String []args)
    {
        double amount;
        Product pr=new Product();
        pr.displayDetails();
        pr.String Product Name="Laptop";
        pr.double price=1000;
        pr.double quantity=57;

    }

}