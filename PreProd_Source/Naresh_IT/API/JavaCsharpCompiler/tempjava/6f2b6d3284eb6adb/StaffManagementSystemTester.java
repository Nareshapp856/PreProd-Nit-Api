
class Staff
{
    protected String name;
    protected int id;

    public Staff(String name,int id)
    {
        this.name=name;
        this.id=id;
    }
    public void displayInfo()
    {
        System.out.println("StaffName :"+name);
        System.out.println("ID :"+id);
    }
}
class Faculty extends Staff
{
 private String department;

 public Faculty(String name,int id,String department)
 {
    super(name,id);
    this.department=department;
 }
 void teachSubject()
 {
    System.out.println("department of Faculty member:"+department);
 }
}
class Professor extends Faculty
{
    String reserchArea;

    public Professor(String name,int id,String department,String reserchArea)
    {
        super(name,id,department);
        this.reserchArea=reserchArea;
    }
    void conductResearch()
    {
        System.out.println("reserchArea :"+reserchArea);
    }
}
public class StaffManagementSystemTester{
  
  Professor obj = new Professor("amruta",123,"AI",OB);
  obj.displayInfo();
  obj.teachSubject();
  obj.conductResearch();
}
