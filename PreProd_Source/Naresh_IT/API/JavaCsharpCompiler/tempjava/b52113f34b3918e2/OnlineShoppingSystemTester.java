public class Product {
    protected String name;
    protected double price;
    public product(String name,double price){
        this.name = name;
        this.price = price;
    }
    public void displayInfo(){
        System.out.println("Product Price is :"+name);
        System.out.pritln("Product Price is "+price);
    }
    public int calculateTotalCost(int quantity){
        return quantity;
    }
}
// class Electronic extends Product{
//     private String brand;
//     super();
//     public Electronic(String brand){
//         this.brand = brand;
//     }
//     public void displayInfo(){
//         System.out.println("Product Brand is "+ brand);
//     }
// }
// class Clothing extends Proudct{
//     private String size;
//     super();
//     public Clothing(Sting size){
//         this.size = size;
//     }
//     public void displayInfo(){
//         System.out.println("Size is "+size);
//     }

// }
class OnlineShoppingSystemTester{
    public static void main(String []args){
        Product product = new Product("Litu",25000);
        product.displayInfo();

    }
}