class Teacher
{
    String name;
    int id;
    String specialization;
    Teacher(String name,int id,String specialization)
    {
        this.name = name;
        this.id = id;
        this.specialization = specialization;
    }
    public void displayDetails()
    {
        System.out.println("Name of a teacher :"+name);
        System.out.println("Id of a teacher :"+id);
        System.out.println("specialization of a teacher :"+specialization);
    } 
}
class Subject extends Teacher{
    String subjectName;
    Subject(String name,int id,String specialization,String subjectName)
    {
        super(name,id,specialization);
        this.subjectName = subjectName;
    }
    public void displaySubject()
    {
        Teacher t = new Teacher();
        t.displayDetails();
        System.out.println("Subject name :"+subjectName);
    }
}
public class Tester
{
    public static void main(String[] args)
    {
        Subject s = new Subject("John Doe",201,"Maths","Algebra");
        s.displaySubject();
    }
}
