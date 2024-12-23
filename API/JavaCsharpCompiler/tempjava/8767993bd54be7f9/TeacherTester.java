class Teacher
{
    private String name;
    private int id;
    private String specialization;
    public void displayDetails()
    {
        System.out.println("Teacher Name:"+name);
        System.out.println("id: "+id);
        System.out.println("specialization: "+specialization);
    }
}
class ClassDetails extends Teacher
{
    private String className;
    private int numberOfStudents;
    super(className,numberOfStudents)
    className=cname;
    numberOfStudents=nstud;
    public void displayClassDetails()
    {
    super();
    System.out.println("Class Name: "+className);
    System.out.println("Number Of Students: "+numberOfStudents);
}
}
public class TeacherTester
{
    public static void main(String[]args);
    {
    ClassDetails cd=new classDetails();
    cd.displayClassDetails();
}
}