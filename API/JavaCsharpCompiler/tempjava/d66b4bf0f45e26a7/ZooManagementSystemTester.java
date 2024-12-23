/*class animal{

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
class lion extends animal{
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
}*/
package com.inheritance;

 class shubhAnimal
{
	private String name;
	private int age;
	
	public shubhAnimal(String name,int age) {
		 if (age <= 0) {
	            System.out.println("Error Invalid Input");
	            return;
	        }
		this.name=name;
		this.age=age;
		}
	public void makeSound() {
		System.out.println("The animal makes a generic sound.");
	}
	
	public void displayInfo() {
		System.out.println("the Animal name is :"+name);
		System.out.println("age is :"+age);
	}

}
class lion extends shubhAnimal 
{
	private int maneLength;
	
	public lion(String name,int age,int maneLength) {
		super(name,age);
		if(maneLength<=0) {
			System.out.println("invalid input");
			return ;
		}
		this.maneLength=maneLength;
		
	}
	public void makeSound() {
		System.out.println("The lion roars loudly.");
	}
	public void displayManeLength()
	{
		System.out.println("Mane Length is :"+maneLength);
	}
}

class Elephant extends shubhAnimal
{
	private float tuskLength;
	
	public Elephant(String name,int age,float tuskLength) {
		super(name,age);
		if(tuskLength<=0) {
			System.out.println("inter valid input");
		}
		this.tuskLength=tuskLength;
	}
	public void makeSound()
	{
		System.out.println("The elephant trumpets.");
	}
	public void displayTuskLength() {
		System.out.println("Tush Length is :"+tuskLength);
	}
	
}
//package com.inheritance;

public class ZooManagementSystemTester {

	public static void main(String[] args) {
		 lion lion = new lion("Simba",5,20);
	        if (lion != null) {
	            System.out.println("Lion Details:");
	            lion.displayInfo();
	            lion.makeSound();
	            lion.displayManeLength();
	            System.out.println();
	        }

	        
	        Elephant elephant = new Elephant("Jumbo", 10, 2.5f);
	        if (elephant != null) {
	            System.out.println("Elephant Details:");
	            elephant.displayInfo();
	            elephant.makeSound();
	            elephant.displayTuskLength();
	        }
	        
	}

}

