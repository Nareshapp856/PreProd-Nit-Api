 class Product{
        String name;
        double price;
        public void displayInfo(){
            public Product(String name,double price){
                this.name=name;
                this.price=price;
            }
    System.out.println("Product Name Is :"+name);
System.out.println("Product Price Is :"+price);
        }
        public int calculateTotalCost(int qunatity){
          int totalCost=price*qunatity;
          return totalCost;
        }
    }
    class Electronics extends Product{
       private String brand;
        public Electronics(String brand){
            super(name,name);
            this.brand=brand;
        }
       public void displayInfo(){
        super.displayInfo();
System.out.println("Product Brand Is :"+brand);
       } 
    }
class Clothing extends Product{
    private String size;
    public Clothing(String size){
        super(name,price);
        this.size=size;
    }
          public void displayInfo(){
        super.displayInfo();
System.out.println(" product size Is :"+size);
       } 
    

}
class OnlineShoppingSystemTester{
    public ststic void main(String[]args){
      //  Product P1=new Product("Laptop",55555.0);
       Electronics E1=new  Electronics("Lapto","HP"); 
        Clothing C1=new Clothing("M");
        

    }
}