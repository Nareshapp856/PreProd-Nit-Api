class Animal
{
    String name;
    int age;

    public Animal(String name,int age)
    {
        this.name=name;
        this.age=age;

    }

    public void makeSound()
    {
        System.out.println("The animal makes a generic sound");
    }


    public void displayInfo()
    {
        System.out.println("Name :"+name);
        System.out.println("Age :"+age);

    }
}

class Lion extends Animal
{
    int maneLength;
    public Lion(String name,int age,int maneLength)
    {
        super(name,age);
        this.maneLength=maneLength;
    }

    public void makeSound()
    {
        System.out.println("Lion Roars Loudly");
    }

    public void displayManeLength()
    {
        System.out.println("maneLength:"+maneLength);
    }


}

class Elephant extends Animal{
    private float tuskLength;
    public Elephant(String name,int age,float tuskLength)
    {
        super(name,age);
        this.tuskLength=tuskLength;
    }

    public void makeSound()
    {
        System.out.println("The elephant Trumpets");
    }

    public void displayTuskLength()
    {
        System.out.println("Tusk Length:"+tuskLength);
    }
}

public class ZooManagementSystemTester
{
    public static void main(String []args)
    {
        Lion lion =new Lion("Simba",10,10);
        lion.displayInfo();
        lion.displayManeLength();

        Elephant elephant =new Elephant("Don",10,4.5f);
        elephant.displayInfo();
        elephant.displayTuskLength();
    }
}