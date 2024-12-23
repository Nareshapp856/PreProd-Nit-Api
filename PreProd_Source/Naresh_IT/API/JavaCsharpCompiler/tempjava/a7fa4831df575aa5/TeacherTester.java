package com.inheritance;

class Teacher{
	private String name;
	private int id;
	private String specialization;
	public Teacher(String name, int id, String specialization) {
		super();
		this.name = name;
		this.id = id;
		this.specialization = specialization;
	}
   public void	displayDetails() {
	   System.out.println("Teacher name :"+name);
	   System.out.println("Teacher id :"+id);
	   System.out.println("Teacher specialization :"+specialization);
   }
}
 
class ClassDetails extends Teacher {
	private String className;
	private int numberOfStudents;
	public ClassDetails(String name, int id, String specialization, String className, int numberOfStudents) {
		super(name, id, specialization);
		this.className = className;
		this.numberOfStudents = numberOfStudents;
	}
	public void displayClassDetails() {
		super.displayDetails();
		System.out.println("Class name :"+className);
		System.out.println("Number of student :"+numberOfStudents);
	}
}

public class TeacherTester {

	public static void main(String[] args) {
		ClassDetails cd=new ClassDetails( "Jane Smith", 301,"Physics", "10th Grade", 40);
		cd.displayClassDetails();

	}

}
