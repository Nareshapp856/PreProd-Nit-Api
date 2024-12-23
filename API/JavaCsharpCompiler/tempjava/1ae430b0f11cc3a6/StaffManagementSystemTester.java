class Staff
{
  String name;  
  int id ;

  public Staff(String name,int id){
	  
    this.name= name;
    this.id = id;
  }
  void displayInfo()
  {
   System.out.println("Staff Name"+name);
   System.out.println("Staff ID"+id);
  }
}
class Faculty extends Staff
{
  String department;

  public Faculty(String name,int id,String department)
  {
	super(department, id);
    this.department=department;
  }
  void techsubject()
  {
    System.out.println("faculty member is teaching");
  }  
}
class Professor extends Faculty
{
 public Professor(String name, int id, String department) {
		super(name, id, department);
		
	}
String researchArea;

 public void conductReserch(String name,int id,String department,String resesrchArea, String researchArea)
 {
  this.researchArea=researchArea;
 }
void conductReserch()
{
  System.out.println("reserch area of the professer"+researchArea);
}
 
}
public class StaffManagementSystemTester
{ 
    public static void main()
    {
      Professor obj = new Professor("Smith",123,"Comp");
      obj.displayInfo();
      obj.techsubject();
    }

}