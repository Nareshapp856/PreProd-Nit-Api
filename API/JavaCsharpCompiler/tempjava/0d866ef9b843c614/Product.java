public class Product
{
  String productName="Laptop";
  double price=1000;
  double newPrice=1200;
  int quantity=57;
  int stockQuantity;
  double discountPercentage;
  
  public void displayDetails(){
   System.out.println("Product Name:+productName");
   System.out.println("Price"+price);
   System.out.println("Quantity:"+quantity);
  }
  public void updatePrice(){
    System.out.println("Product Name:"+productName);
    System.out.println("Price:"+newPrice);
    System.out.println("Quantity:"+quantity);
  }
   public void checkAvailable(int stockQuantity){
    if(stockQuantity>0)
    {
    System.out.println(true);
    }
    else
    { 
       System.out.println(false);
    }
    
    public void calculateDiscount(double discountPercentage)
    {
      newprice=price-(price*(discountPercentage/100));
     
    }
    public static void main(String [] args){
      Product ob=new Product();
      ob.displayDetails();
   
    }
    
  }

  }
  
