class Teacher
{
    private String name;
    private int id;
    private String specialization;
    Teacher(String name,int id,String specialization)
    {
        this.name=name;
        this.id=id;
        this.specialization=specialization;
    }
    public void displayInfo()
    {
        System.out.println("Name:"+name);
        System.out.println("id:"+id);
        System.out.println("Specialization:"+specialization);     
    }
}
class Subject extends Teacher{
    private String subjectName;
    Subject(String name,int id,String specialization,String subjectName)
    {
        super(name,id,specialization);
        this.subjectName;
    }
    public void displayDetails()
    {
        super.displayInfo();
        System.out.println("Subject Name:"+subjectName);
    }
}
public class Tester
{
    public static void main(String[] args)
    {
        Subject s=new Subject("John Doe",201,"Mathematics","Algebra");
        s.displayDetails();
    }
}