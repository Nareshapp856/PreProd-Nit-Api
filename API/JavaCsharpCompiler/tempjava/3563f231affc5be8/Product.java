public class Product{
    String productName;
    double price;
    int quantity;
    public static void displayDetails(){
    System.out.println("Product Name:"+productName+ "Price:"+price+"Quantity:"+quantity);
    }

     public void updatePrice(){
        double upPrice;
        newPrice=(100+price);
        System.out.println("After updating the price:");
        System.out.println("Product Name:"+productName+ "Price:"+upPrice+"Quantity:"+quantity); 
    }
    public void checkAvailable(){
        System.out.println("Is the product available in stock?");
        if(quantity>0){
            System.out.println("True");
        }else{System.out.println("False");}
    }
    public void calculateDiscount(){
        int newPrice,discPercentage;
        newPrice=price-(price*(discPercentage/100));
        System.out.println("Discounted Price after 10% off"+newPrice);
    }

public void main(String []args){
int quantity=57;
double price=1000;
String productName="Laptop";
displayDetails();
}
}