class Staff
{
    String name;
    int id;
    public Staff(String name,int id)
    {
        this.name=name;
        this.id=id;
    }
    public  void displayInfo()
    {
        System.out.println("Staff member name is:"+name);
        System.out.println("Staff member id is:"+id);
    }
}
class Faculty extends Staff
{
    String department;
    public Faculty(String name,int id,String department)
    {
        super(name,id);
        this.department=department;
    }
    public  void teachSubject()
    {
        super.displayInfo();
        System.out.println("department is:"+department);
    }
}
class Professor extends Faculty
{
    String researchArea;
   public Professor(String name,int id,String department,String researchArea)
    {
        super(name,id,departement);
        this.researchArea=researchArea;

    }
    public void conductResearch()
    {
        super.teachSubject();
        System.out.println("researchArea: "+researchArea);
    }
}
public class StaffManagementSystemTester
{
    public static void main(String [] args)
    {
        Professor p=new Professor("supraja",101,"computers","java");

        p.conductResearch();
    }
}