import java.io.*;
class Product{
    protected String name;
    protected double price;

    Product(String name,double price){
        this.name=name;
        this.price=price;
    }import java.util.Scanner;
class Product{
    protected String name;
    protected double price;

    Product(String name,double price){
        this.name=name;
        this.price=price;
    }

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price);
    }

    public double calculateTotalCost(int quantity){
        return quantity*(int)price;
    }

}
class Clothing extends Product{
    private String size;
    Clothing(String name,double price,String size){
        super(name,price);
        this.size=size;
    }

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price+"\n"+"Size:"+size);
    }

    
}

class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;

    }

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price+"\n"+"Brand:"+brand);
    }    
}
public class OnlineShopingSystem{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter how many fan you want to buy");
        
        Electronics E=new Electronics("Fan",1200,"Bajaj");
        int a=sc.nextInt();
        
        E.displayInfo();
        System.out.println("Calculate Price:"+E.calculateTotalCost(a));

        System.out.println("Enter how many T-shirt you want to buy");
        int b=sc.nextInt();
        Clothing C=new Clothing("T-shirt",500,"M");
        
        C.displayInfo();
        System.out.println("Calculate Price:"+C.calculateTotalCost(a));

    }
}

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price);
    }

    public double calculateTotalCost(int quantity){
        return quantity*(int)price;
    }

}
class Clothing extends Product{
    private String size;
    Clothing(String name,double price,String size){
        super(name,price);
        this.size=size;
    }

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price+"\n"+"Size:"+size);
    }

    
}

class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand){
        super(name,price);
        this.brand=brand;

    }

    public void displayInfo(){
        System.out.println("Name:"+name+"\n"+"Price:"+price+"\n"+"Brand:"+brand);
    }    
}
public class OnlineShopingSystem{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter how many fan you want to buy");
        int a=sc.nextInt();
        Electronics E=new Electronics("Fan",1200,"Bajaj");
        E.calculateTotalCost(a);
        E.displayInfo();

        System.out.println("Enter how many T-shirt you want to buy");
        int b=sc.nextInt();
        Clothing C=new Clothing("T-shirt",500,"M");
        C.calculateTotalCost(b);
        C.displayInfo();
        

    }
}