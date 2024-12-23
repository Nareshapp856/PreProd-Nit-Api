package exam;

class Staff
{
	String name;
	int id;
	
	public Staff(String name, int id)
	{
		this.name = name;
		this.id = id;
	}
	
	public void displayInfo()
	{
		System.out.println("Name :"+name);
		System.out.println("Id : "+id);
	}
}

class Faculty extends Staff
{
	String department;

	public Faculty(String name, int id, String department) 
	{
		super(name, id);
		this.department = department;
	}
	
	public void teachSubject()
	{
		System.out.println("Department :"+department);
	}
	
}

class Professor extends Faculty
{
	String researchArea;

	public Professor(String name, int id, String department, String researchArea) 
	{
		super(name, id, department);
		this.researchArea = researchArea;
	}
	
	public void conductResearch()
	{
		System.out.println("Research Area: "+researchArea);
	}
}

public class StaffManagementSystemTester 
{
	public static void main(String[] args) 
	{
		Professor p1 = new Professor("Rahul",111,"CS","Java");
		p1.displayInfo();
		p1.teachSubject(); 
		p1.conductResearch();
	}

}
