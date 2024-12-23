

class Teacher
{
    private String name;
     private int id;
    private String Specialization;

    public Teacher(String name,int id,String Specialization)
    {
       this.name=name;
       this.id=id;
       this.Specialization=Specialization;

    }

    public void displayDetails()
    {
       System.out.println("Name of Teacher = "+name);
        System.out.println("Teacher id is = "+id);
    System.out.println(" Subject name = "+Specialization);
    }
}

class ClassDetails extends Teacher
{
    private String className;
    private int numberOfStudents; 

    public ClassDetails(String name,int id,String Specialization,String className,int numberOfStudents)
    {
        
        super(name,id,Specialization);
        this.className=className;
        this.numberOfStudents=numberOfStudents;
    }

    public void displayClassDetails()
    {
        System.out.println("Name of Teacher = "+name);
        System.out.println("Teacher id is = "+id);
    System.out.println(" Subject name = "+Specialization);
       System.out.println(" Class Name = "+className);
       System.out.println(" Number of Student = "+numberOfStudents); 
    }
}

public class TeacherTester
{
    public static void main (String []args)
    {
        ClassDetails c1 = new ClassDetails("Jane Smith",301,"Physics","10th Grade",40);
        c1.displayDetails();
        c1.displayClassDetails();
    }
}