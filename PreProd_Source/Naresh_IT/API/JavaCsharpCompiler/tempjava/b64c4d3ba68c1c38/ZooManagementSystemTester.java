class animal{

    private String name;
    private int age;

 public animal(String name,int age)
 {  
    this.name=name;
    this.age=age;
 }
 public void makeSound(){
    system.out.println("The animal makes a generic sound");
 }
    public void displayInfo()
    {
        system.out.println("Name"+name);
        system.out.println("Age"+age);
    }
 }
class animal extends lion{
    private int maneLength;
    public  lion(String name,int age,int maneLength) {
        super(name,age);
        this.maneLength=maneLength; 
    }
    public void makeSound(){
        system.out.println("The lion roars loudly.");
    }
    public void displayManeLength() {
        system.out.println("Mane Length :"+maneLength);
    }
}
class elephant extends animal
{
    private float tuskLength;
    public elephant(String name,int age,float tuskLength)
    {
        super(name,age);
        this.tuskLength=tuskLength;
    }
    public void makeSound(){
        system.out.println("The elephant trumpets.");
    }
    public void displayTuskLength(){
        system.out.println("Tusk Length"+tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main(String[]args)
    {
      lion l=new lion("sher",5,10);
      l.makeSound();
      l.displayManeLength();
      system.out.println(l);
    } 
}