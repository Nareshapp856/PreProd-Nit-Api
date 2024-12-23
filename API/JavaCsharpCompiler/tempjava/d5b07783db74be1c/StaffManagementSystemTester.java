 class Staff
{
    String name;
    int id;
    public Staff(String name,int id)
    {
        this.name=name;
        this.id=id;
    }
    public void displayInfo()
    {
        System.out.println("faculty name "+name);
        System.out.println("Id "+id);
    } 
}
class Faculty extends Staff
{
   String dept;
   public Faculty(String name,int id, String dept)
   {
    super(name,id);
    this.dept=dept;
   }
   public void teachSubject()
   {
       super.displayInfo();
       System.out.println(" faculty mem is teachimg");
   }
}
 class Professor extends Faculty
 {
    String resarea;
    public Professor(String name,int id,String resarea)
    {
        super(name,id,dept);
        this.resarea=resarea;
    }
    public void conductResearch()
    {
        super.displayInfo();
        System.out.println("research area of the proffessor ");
    } 
 }
 public class StaffManagementSystemTester
 {
    public static void main(String...args)
    {
        Professor p =new Professor("Ravi",101,"ABC");
        p.conductResearch();
    }
 }