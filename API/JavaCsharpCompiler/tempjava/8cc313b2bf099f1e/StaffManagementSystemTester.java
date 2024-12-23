class Staff{
	String name;
	int id;
	
	public Staff(String name, int id) {
		this.name = name;
		this.id = id;
	}
	
	public void displayInfo() {
		System.out.println("Staff member name : "+name);
		System.out.println("Staff member id : "+id);
	}
}

class Faculty extends Staff{
	String department;
	
	public Faculty(String name, int id, String department) {
		super(name, id);
		this.department = department;
	}
	
	public void teachSubject() {
		displayInfo();
		System.out.println("The faculty member is teaching : "+department);
	}
}

class Professor extends Faculty{
	String researchArea;
	
	public Professor(String name, int id, String department, String researchArea) {
		super(name, id, department);
		this.researchArea = researchArea;
	}
	
	public void conductResearch() {
		teachSubject();
		System.out.println("Professor's Research area : "+researchArea);
	}
}

public class StaffManagementSystemTester {
	public static void main(String []args) {
		Staff s = new Staff("Suraj", 101);
		s.displayInfo();
		
		System.out.println();
		
		Faculty f = new Faculty("Suraj", 101, "Mathematics");
		f.teachSubject();
		
		System.out.println();
		
		Professor p = new Professor("Suraj", 101, "Mathmatics", "Quantum Computing");
		p.conductResearch();
	}
}