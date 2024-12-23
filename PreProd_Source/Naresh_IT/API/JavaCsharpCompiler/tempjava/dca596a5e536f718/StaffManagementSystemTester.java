package com.pravi.inheritance;

class Staff {
	protected String name;
	protected static int id;
	protected String researchArea;

	public Staff(String name, int id) {
		this.name = name;
		this.id = id;
	}

	public void displayInfo() {
		System.out.println("name:" + name);
		System.out.println("id:" + id);
	}
}

class Faculty extends Staff {
	public Faculty(String name, int id) {
		super(name, id);

	}

	protected String department;

	public void Faculty(String department) {

		this.department = department;
	}

	public void teachSubject(int member) {
		System.out.println("faculty member:" + member);
	}

}

class Professor extends Faculty {
	public Professor(String name, int id) {
		super(name, id);

	}

	protected String researchArea;


	public void Professor(String researchArea) {
		this.researchArea = researchArea;
	}

	public void conductResearch() {
		System.out.println("research area of the professor:" + researchArea);
	}
}

public class StaffManagementSystemTester {
	public static void main(String[] args) {
		Staff s = new Staff("pravin", 100);
		s.displayInfo();
		// System.out.println(s);

		Faculty f = new Faculty("it", 100);
		f.teachSubject(5);
		System.out.println(f);

		Professor p = new Professor("Hyderabad", 100);
		p.conductResearch();
		System.out.println(p);

	}

}
