class Animal
{
    private String name;
    private int age;

    Animal(String name,int age)
    {
        this.name=name;
        this.age=age;
    }

    void makeSound() 
    {
        System.out.println("The animal makes a generic sound");
    }

    void displayInfo()
    {
        System.out.println("Name :"+name);
        System.out.println("Age :"+age);

    }
}

class Lion extends Animal
{
    private int maneLength;

    Lion(String name,int age,int maneLength)
    {
        super(name,age);
        this.maneLength=maneLength;
    }

    void makeSound()
    {
        System.out.println("The lion roars loudly");
    }

    void displayManeLength()
    {
        System.out.println("Mane Length :"+maneLength);
    }
}


class Elephant extends Animal
{
    private float tuskLength;
    Elephant(String name,int age,float tuskLength)
    {
        super(name,age);
        this.tuskLength=tuskLength;
    }

    void makeSound()
    {
        System.out.println("The elephant trumpets");
    }
    
    void displayTuskLength() 
    {
        System.out.println("Tusk Length"+tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main(String[]args)
    {
        Lion l1= new Lion("Leo",7,25);
        Elephant e1= new Elephant("Hathii",10,50);

        System.out.println("-----Elephant-----");
        l1.displayInfo();
        l1.makeSound();
        l1.displayManeLength();


        System.out.println("(\n\n-----Lion-----");
        e1.displayInfo();
        e1.makeSound();
        e1.displayTuskLength();
    }
}