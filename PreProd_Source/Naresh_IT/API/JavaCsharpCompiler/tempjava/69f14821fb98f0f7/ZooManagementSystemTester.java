class Animal{
    private String name;
    private int age;

    Animal(String name, int age){
        super();
        this.name = name;
        this.age = age;
    }

    public void makeSound(){
        System.out.println("The animal makes a generic sound.");
    }

    public void displayInfo(){
        System.out.println("Animal name : "+this.name);
        System.out.println("Animal age : "+this.age);
    }
}

class Lion extends Animal{
    private int maneLength;

    Lion(String name, int age, int maneLength){
        super(name, age);
        this.maneLength = maneLength;
    }

    public void makeSound(){
        System.out.println("The lion roars loudly.");
    }

    public void displayManeLength(){
        System.out.println("Manelength :"+this.maneLength);
    }
}

class Elephant extends Animal{
    private float tuskLength;

    Elephant(String name, int age, float tuskLength){
        super(name, age);
        this.tuskLength = tuskLength;
    }

    public void makeSound(){
        System.out.println("The elephant trumpets");
    }

    public void displayTuskLength(){
        System.out.println("TuskLength :"+this.tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main(String[] args){
        Lion l = new Lion("Leo",15,20);
        l.displayInfo();
        l.displayManeLength();
        l.makeSound();

        Elephant e = new Elephant("REEZ",20,5);
        e.displayInfo();
        e.displayTuskLength();
        e.makeSound();
    }
}

/*
Animal name : Leo
Animal age : 15
Manelength :20
The lion roars loudly.
Animal name : REEZ
Animal age : 20
TuskLength :5.0
The elephant trumpets
*/