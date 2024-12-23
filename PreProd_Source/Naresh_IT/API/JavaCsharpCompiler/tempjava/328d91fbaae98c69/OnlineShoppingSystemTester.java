package New.m1;


class product
{
    protected String name;
    protected double price;
    product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }


    public void Displayinfo()
    {
        System.out.println("product name :"+name);
        System.out.println("product price:"+price);
    } 

    public double CalculeTotalCost(double Quantity)
    {
    	 double total=Quantity*this.price;
    	 System.out.println("total "+total);
        return total;
    }

}
class Electronics extends product
{
    private String Brand;
    Electronics(String name,double price,String Brand)
    {
        super(name,price);
        this.Brand=Brand;
        
    }

    public void Displayinfo()
    {
        System.out.println("Brand :"+Brand);
        System.out.println("product name :"+name);
        System.out.println("product price:"+price);
    
    }
}
class clothing extends product
{
    private String size;
    clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }
    public void Displayinfo()
    {
        System.out.println("size of the "+size);
        System.out.println("product name :"+name);
        System.out.println("product price:"+price);
    }
}
public class OnlineShoppingSystemTester{
    public static void main(String [] args)
    {
        clothing c=new clothing("tata",500,"l");
        Electronics e=new Electronics("new",600,"nova");
        c.Displayinfo();
        e.Displayinfo();
    }

}
