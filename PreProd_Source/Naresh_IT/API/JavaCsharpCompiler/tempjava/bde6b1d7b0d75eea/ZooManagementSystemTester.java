class Animal
{
    private String name;
    private int age;

    public Animal(String name, int age)
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
    	System.out.println("Name: "+name);
    	System.out.println("Age: "+age);
    }
}

class Lion extends Animal
{
	private int maneLength;
	
	public Lion(String name, int age, int maneLength)
	{
		super(name, age);
		this.maneLength=maneLength;
	}
	
	public void makeSound()
    {
    	System.out.println("The lion roars loudly");
    }
    
    public void displayDetails()
    {
    	//System.out.println("Name: "+name);
    	System.out.println(" Lion maneLength: "+ maneLength);
    	
    }
}

class Elephant extends Animal
{
	private float tuskLength;
	
	public Elephant(String name, int age, float tuskLength)
	{
		super(name, age);
		this.tuskLength=tuskLength;
	}
	
	public void makeSound()
    {
    	System.out.println("The elephant trumpets.");
    }
    
    public void displayDetails()
    {
    	System.out.println("Elephant tuskLength: "+tuskLength);
    	
    }
	
}


public class ZooManagementSystemTester {

	public static void main(String[] args) 
	{
		Lion l = new Lion("Ganesh",20,5);
		Elephant e = new Elephant("Ram",25,10);
		System.out.println("Lion :");
		l.makeSound();
		l.displayDetails();
		System.out.println("=================================");
		System.out.println("Elephant :");
		e.makeSound();
		e.displayDetails();
		

	}

}