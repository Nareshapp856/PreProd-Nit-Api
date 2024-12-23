package practice;
class Teacher
{
    public String name;
    public int id;
    public String specialization;
    Teacher (String name,int id,String specialization)
    {
        this.name = name;
        this.id = id;
        this.specialization = specialization;
    }
    public void displayDetails()
    {
        System.out.println("Teacher name = "+name );
        System.out.println("Id = "+id );
        System.out.println("specialization = "+specialization );
    }
}

class ClassDetails extends Teacher
{
	private String className;
    private int numberOfStudents;
    ClassDetails(String name, int id, String specialization,String className,int numberOfStudents) {
		super(name, id, specialization);
		this.className = className;
		this.numberOfStudents = numberOfStudents;
	}
    
    public void displayDetails()
    {
        System.out.println("Teacher name = "+name );
        System.out.println("Id = "+id );
        System.out.println("specialization = "+specialization );
        System.out.println("Class Name  = "+className );
		System.out.println("Number of Students = "+numberOfStudents);

    }
}

public class TeacherTester1 {

	public static void main(String[] args) {
		
		ClassDetails cla = new ClassDetails("Jane Smith" ,301, "Physics","10th Grade", 40);
		cla.displayDetails();	
	}

}
