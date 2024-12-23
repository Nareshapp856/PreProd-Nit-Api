public class Product{
    String productName;
    double price;
    int quantity;
    public static void displayDetalis(){
     Product p1=new Product();
    p1.productName="Laptop";
    p1.price=1000.0;
    p1.quantity=57;
    System.out.print("Product Name:"+p1.productName);
     System.out.print("Price:"+p1.price);
     System.out.print("Quantity:"+p1.quantity);
    }
    public stativ void updatePrice(){
    double newPrice=1200.0;
    Product p1=new Product();
    p1.productName="Laptop";
    p1.price=1000.0;
    p1.quantity=57;
    System.out.print("After Updating the price:");
    System.out.print("Product Name:"+p1.productName);
     System.out.print("Price:"+p1.newPrice);
     System.out.print("Quantity:"+p1.quantity);
    }
    public static void CheckAvailable(){
        int stockQuatity=200;
         Product p1=new Product();
          p1.quantity=57;
          if(stockQuatity-p1.quantity>=0){
          System.out.print("Is the Product Available in stock ? true");
          }
          else System.out.print("Is the Product Available in stock ?false");
    }
    public static void calculteDiscount(){
        double discountPercentage=10;
        double newPrice=0;
        Product p1=new Product();
    p1.productName="Laptop";
    p1.price=1200.0;
        newPrice=p1.price-(p1.price*(discountPercentage/100));
        System.out.print("Dicounted Price after"+discountPercentage+"% off:"+newPrice);
    }
    public static void main(String[]args){
        displayDetalis();
        updatePrice();
        CheckAvailable();
        calculteDiscount();
    }
}