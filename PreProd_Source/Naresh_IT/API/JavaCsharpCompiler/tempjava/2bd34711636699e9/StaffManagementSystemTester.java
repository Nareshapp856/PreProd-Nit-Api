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
        super(name,id);
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
        Faculty f =new Faculty("Ravi",101,"Teaching");
        f.teachSubject();
    }
 }