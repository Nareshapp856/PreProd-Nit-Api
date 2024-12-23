class Animal{
    private String Name;
    private int age;
    public Animal(String Name, int age)
    {
        this.Name=Name;
        this.age=age;
    }

    public void makeSound()
    {
        System.out.println("The animal makes a generic sound.");
    }
    public void displayInfo()
    {
        System.out.println("Nmae:"+Name);
        System.out.println("Age:"+age);
    }
}

class Lion extends Animal{
    private int manelength;

    public Lion(String Name, int age,int manelength)
    super(Name,age);
    this.manelength=manelength;

    public void makeSound(){
        System.out.println("The lion roars loudly");
       
    }
    public void displayManeLength()
    {
        System.out.println("maneLength is:"+maneLength);
    }
}
class Elephant extends Animal{
    private float tuskLength;
    public Elephant(String Name, int age,int manelength,float tuskLength);
    super(Name,age,manelength);
    this.manelength=manelength;

    pblic void makeSound()
    {
        super(Name,age, manelength);
        System.out.println("The elephant trumpets");
    }
    public void displayTuskLength(){
        System.out.println(" tuskLength is:"+ tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main{
        Lion l = new Lion();
        l.Name="aa";
        l.age=12;
        l.makeSound();
        l.makeSound();
        l.displayManeLength();
        Elephant e = new Elephant();
        e.Name="aaa";
        e.age=12;
        e.makeSound();
        e.displayTuskLength();


    }
}

