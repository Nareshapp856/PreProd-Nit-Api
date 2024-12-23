import java.lang.*Scaneer;
public class Staff
{
    Scanner sc= new Scanner(system.in);
    String name;
    int id;

    public Staff(String name, int id )
    {
        this name=name;
        this id=id;

    }

    public void displayInfo();
    {
        System.out.println("Enter the Staff name: ");
        String name=sc.nextString;
        System.out.println(staff member's name: + name);
        
        System.out.println("Enter the Staff id: ");
        int  id=sc.nextInt;
        System.out.println(staff member's id: + id);
    
    }   
}

public class Faculty Extends Faculty
{
    String department;

    public faculty(String department)
    {
        this department=department;

    }

    public void teachSubject()
    {
        System.out.println("Enter the faculty department: ");
        String department=sc.nextString;
        System.out.println   ("department :" + department);
    
    }
}

public class Professor Extends Professor
{
    String researchArea;

    public Professor( String researchArea)
    {
        this Professor=Professor;
    }
    public void void conductResearch()
    {
        System.out.println("Enter  research area of prof. ");
        String researchArea=sc.nextString;
        System.out.println ("research area :" + researchArea);
    }
}
public class StaffManagementSystemTester
{
    public static void main()
    {
        new Staff.displayInfo();
        
    }
}