class Staff
{
    private int id;
    private String name;
    public Staff(int id,String name)
    {
        this.id=id;
        this.name=name;
    }
    public void  displayInfo()
    {
        System.out.println("Staff Id: "+id);
        System.out.println("Staff Name: "+name);

    }
}
class Faculty extends Staff
{
    private String department;
    public Faculty(int id,String name,String department)
    {
        super(id,name);
        this.department=department;
    }
    public void teachSubject()
    {

        System.out.println("Department: "+department);
    }
}
class Professor extends Faculty
{
    private String researchArea; 
    public Professor(int id,String name,String department,String researchArea)
    {
        super(id,name,department);
        this.researchArea=researchArea;

    }
    public void conductResearch()
    {
    
        System.out.println("Research Area: "+researchArea);
    }

}
public class StaffManagementSystemTester
{
    public static void main(String[] args)
    {
        Staff s1=new Staff(101,"Aryan");
        s1.displayInfo();
        
        Faculty f=new Faculty("Science");
        f.teachSubject();

        




    }
}