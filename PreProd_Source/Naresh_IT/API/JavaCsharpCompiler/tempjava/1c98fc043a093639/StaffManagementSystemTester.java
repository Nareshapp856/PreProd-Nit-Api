
class Staff
{
    String name;
    int id;
    public Staff(String name,int id)
    {
        super();
        this.name=name;
        this.id=id;
    }
    public void displayInfo()
    {
        System.out.println("Staff member's Name :"+name);
        System.out.println("Staff member's Id :"+id);
    }

}

class Faculty extends Staff
{
    String department;
    public Faculty(String name,int id,String department)
    {
        super("Nik",10);
        this.department=department;
    }
    public void teachSubject(){
        System.out.println("Faculty member is teaching in "+department+"department");
    }
}

class Professor extends Faculty
{
    String reseachArea;
    public Professor(String name,int id,String department,String reseachArea)
    {
        super("hi",9,"cse",);
        this.reseachArea=reseachArea;
    }
    public void conductResearch()
    {
        System.out.println("The research area of the professor is "+reseachArea);
    }

}

public class StaffManagementSystemTester
{
    public static void main(String[] args)
    {
        Professor p = new Professor("HYderabad");
        p.displayInfo();
        p.teachSubject();
        p.conductResearch();
    }

}