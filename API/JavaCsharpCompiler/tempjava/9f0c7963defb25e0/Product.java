public class Product{
    String productName;
   double price;
   int quantity;
   public void displayDetails(){
    productName="Laptop";
    price=1000;
    quantity=57;
    System.out.print("Product Name:"+productName);
    System.out.print("Product Price:"+price);
    System.out.print("Product Quantity:"+quantity);
    }
    public void updatePrice(double newProductPrice){
     System.out.println("After Updating the price:")
     newProductPrice=12000;
     System.out.print("Product Name:"+productName);
    System.out.print("Product New Price:"+newProductPrice);
    System.out.print("Product Quantity:"+quantity);
    }
    public void checkAvailable(int stockQuantity){
        if(quantity<0){
            System.out.print("The Product is not availble");
        }
        else{
            System.out.print("The Product is availble");
        }
    }
    public void calculateDiscount(double discountPrice){
       newPrice = price - (price * (discountPercentage / 100));
    }
}