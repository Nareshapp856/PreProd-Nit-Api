class Animal{
    private String Name;
   class Animals{ 
	private String Name;
    private int age;
    public Animals(String Name, int age)
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

class Lion extends Animals{
    private int manelength;

    public Lion(String Name, int age,int manelength){
    super(Name,age);
    this.manelength=manelength;
    }
    public void makeSound(){
        System.out.println("The lion roars loudly");
       
    }
    public void displayManeLength()
    {
    	super.makeSound();
        System.out.println("maneLength is:"+manelength);
    }
}
class Elephant extends Animals{
    private float tuskLength;
    
    public Elephant(String Name, int age, float tuskLength) {
		super(Name, age);
		this.tuskLength = tuskLength;
	}
	public void makeSound(){
        
        System.out.println("The elephant trumpets");
    }
    public void displayTuskLength(){
    	super.makeSound();
        System.out.println(" tuskLength is:"+ tuskLength);
    }
}

public class ZooManagementSystemTester{
    public static void main(String[] args){
    	System.out.println("Lion details");
        Lion l = new Lion("AAA", 1, 5);
        l.displayInfo();
        l.makeSound();
        l.displayManeLength();
        System.out.println("Elephant details");
        Elephant e = new Elephant("AA", 5, 5);
        e.displayInfo();
        e.makeSound();
        e.displayTuskLength();


    }
}
