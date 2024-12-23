class Product
{
    String name;
    double price;
    product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }
    public void display()
    {
        System.out.println("the product name is:"+name);
        System.out.println("the product price is:"+price);
    }
    public void calculatetotalcost(int quantity)
    {
        totalcost=price*quantity;
        return totalcost;
    }
}
class Electronics extends Product
{
    private String brand;
    Electronics(String name,double price,String brand)
    {
        super(name,price)
        this.brand=brand;   
    }
    public void displayinfo()
    {
        System.out.println("the brand name is :"+brand);
    }
}
class Clothing extends Product
{
    private String size;
    Clothing(String name,double price,String size)
    {
        super(name,price,size)
        this.size=size;
    }
    public void displayinfo1()
    {
        System.out.println("size is:"+size);
    }
}
Public class OnlineShoppingSystemTester
{
    public static void main(String[] args)
    {
        Electronics obj=new Eletronics('mobile',12000.0,'redmi');
        Clothing object=new Clothing('shirt',500.0,'formal');
    }
}