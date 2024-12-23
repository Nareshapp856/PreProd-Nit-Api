class Animal{
    private String name;
    private int age;
    Animal(String name,int age){
        this.name=name;
        this.age=age;
    }
    public void makeSound(){
        System.out.println("The animal makes a generic sound.");
    }
    public void displayInfo(){
            System.out.println("Name: "+name);
            System.out.println("Name: "+age);
    }
}
class Lion extends Animal{
    private int maneLength;
    Lion(String name,int age,int maneLength){
        super(name,age);
        this.maneLength=maneLength;
    }
    public void makeSound(){
     System.out.println("The lion roars loudly.");
    }
    public void displayManeLength(){
        super.displayInfo();
    System.out.println("maneLength is: "+maneLength);
 
    }
}

class Elephant extends Animal{
    private float tuskLength;
    Elephant(String name,int age,float tuskLength){
      super(name,age);
      this.tuskLength=tuskLength;
    }
    public void displayTuskLength() {
        super.displayInfo();
    System.out.println("TuskLength is: "+tuskLength);

    }
}

public class ZooManagementSystemTester{
    public static void main(String[]args){
    Lion obj1=new Lion("Elephant",8,3);
    obj1.displayManeLength();
    Elephant obj2=new Elephant("Lion",5,4);
    obj2.displayTuskLength();
    }
}