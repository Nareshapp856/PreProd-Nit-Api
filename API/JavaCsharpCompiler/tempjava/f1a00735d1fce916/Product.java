public class Product{
    String productName;
    double price;
    int quantity;
    public void displayDetail()
    {
        System.out.println("Product Name: "+productName);
        System.out.println("Price: "+price);
        System.out.println("Quantity: "+quantity);
    }
    public void updatePrice(double newPrice)
    {
        price = newPrice;
        displayDetail();
    }
    public void checkAvailable(int stockQuantity)
    {
        displayDetail();
        if(stockQuantity>0 && stockQuantity<=quantity)
        {
            stockQuantity = 1;
            System.out.println("Is the product available in stock? true");
        }
        else
        {
            stockQuantity=0;
        }
    }
    public void calculateDiscount(double discountPercentage)
    {
        updatePrice();
        newPrice = price-(price*(discountPercentage/100));
        System.out.println("Discounted Price after 10% off:"+price);
    }
    public static void main(String []args)
    {
        Product p1=new Product();
        p1.productName="Laptop";
        p1.price=1000.0;
        p1.quantity=57;
        p1.updatePrice(200);
        p1.checkAvailable(true);
        p1.calculateDiscount(10);
    }
}