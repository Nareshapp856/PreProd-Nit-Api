class Animal{
    private String name;
    private int age;
    Animal(String name, int age){
        this.name = name;
        this.age = age;
    }
    public void makeSound(){
        System.out.println("The animal makes a generic sound.");
    }
    public void displayInfo(){
        System.out.println("Name:-"+name+"\nAge:-"+age);
    }
}

class Lion extends Animal{
    private int maneLength;
    Lion(String name, int age, int maneLength){
        super(name,age);
        this.maneLength = maneLength;
    }
    public void makeSound(){
        System.out.println("The lion roars loudly.");
    }
    public void displayManeLength(){
        System.out.println("ManeLength:-"+maneLength);
    }
}

class Elephant extends Animal{
    private float tuskLength;
    Elephant(String name, int age, float tuskLength){
        super(name,age);
        this.tuskLength = tuskLength;
    }
    public void makeSound(){
        System.out.println("The elephant trumpets.");
    }
    public void displayTuskLength(){
        System.out.println("TuskLength:-"+tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main(String []args){
        Lion l = new Lion("Lion",32,7);
        Elephant e = new Elephant("Elephant",33,8);
        l.makeSound();
        l.displayManeLength();
        e.makeSound();
        e.displayTuskLength();
    }
}