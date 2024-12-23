class Product
 {
    protected String name;
    protected Double price;

    public Product( String name, Double price)
    {
    this.name = name;
    this.price = price;
    }
    public void DisplayInfo()
    {
        System.out.println( "The name is :" +name);
        System.out.println( "And price is :" +price);
    }
    
 }
 
 class Clothing extends Product
 {
    private String size;

    public  Clothing(String name, Double price, String size)
    {
       super (name,price);
        this.size = size;
    }
    public void DisplayInfo()
    {
       super.DisplayInfo();
	   System.out.println("The Size of cloth is :"+size);  
    }
    public double calculateTotalCost(int quantity) 
    {
        return price * quantity;
    }

 }

 public class OnlineShopping {
			public static void main (String []args)
			{

				Clothing C = new Clothing ("cloth",1999.00,"L");
				C.DisplayInfo();
	
		}

		}
   
