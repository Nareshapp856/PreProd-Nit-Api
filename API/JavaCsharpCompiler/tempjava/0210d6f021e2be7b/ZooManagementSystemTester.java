class Animal
{
    private String name;
    private int age;
    Animal(String name,int age)
    {
        this.name=name;
        this.age=age;
    }
    public void makeSound()
    {
        System.out.println("The animal makes a generic sound.");
    }
    public void displayDetails()
    {
        System.out.println("name :"+name);
        System.out.println("age :"+age);
    }
}

class Lion extends Animal
{
    private double tuskLength;
    Lion(String name,int age,double tuskLength)
    {
        super(name,age);
        this.tuskLength=tuskLength;
    }
    public void displayTuskLength()
    {
        super.displayDetails();
        System.out.println("TuskLength :"+tuskLength);
    }
}
public class ZooManagementSystemTester
{
    public static void main (String[] args)
    {
        Lion l=new Lion("animal",5,5.5);
        l.displayDetails();
    }
}