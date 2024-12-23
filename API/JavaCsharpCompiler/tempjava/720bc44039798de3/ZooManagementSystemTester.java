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
    System.out.println("The animal makes a generic sound.");
}
void displayInfo() 
{
 System.out.println("The name of animal is."+this.name);
  System.out.println("The ageof animal is."+this.age);
}
}

class Lion extends Animal
{
    private int len;

    Lion(String name,int age,int len)
    {
        super(name,age);
        this.len=len;
    }

void makeSound()
{
     System.out.println("The lion roars loudly."); 
} 

void displayManeLength()
{
    System.out.println("The Len animal is."+this.len); 
}

}


class Elephant extends Animal{
    private flaot tuskLenght;

    Elephant(String name,int age,int len,flaot tuskLenght)

    {
        super(name,age);
        this.tuskLenght=tuskLenght;
    }


    void makeSound()
    {
        System.out.println("The elephant trumpets.");  
    }


  void displayTuskLength()
  {
    System.out.println("The elephant len."+tuskLenght); 
  }  
}

public class ZooManagementSystemTester
{
    public static void main(String args[])
    {
        Lion l=new Lion("hhh",9,12);
        l.makeSound();
        l.displayManeLength();

        Elephant e=new Elephant("kk",-2,33);
        e.makeSound();
        e.displayTuskLength();


    }
}