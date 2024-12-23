public class Product{
    String productName="Laptop";
    double price=1100;
    int quantity=57;
    public void displayDetails(){
    System.out.println("Product Name:"+productName+ "Price:"+price+"Quantity:"+quantity);
    }

     public void updatePrice(){
        double upPrice;
        upPrice=(100+price);
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
        double newPrice,discPercentage=10;
        newPrice=price-(price*(discPercentage/100));
        System.out.println("Discounted Price after 10% off"+newPrice);
    }

public void main(String []args){
displayDetails();
}
}