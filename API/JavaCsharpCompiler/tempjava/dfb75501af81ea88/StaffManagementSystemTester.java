package prog;

 public class Staf
{
String name;
int id;
public Staf(String name ,int id)
{
    this.name=name;
    this.id=id;
}
public void displayInfo()
{
    System.out.println("Staff member name is :"+name);
    System.out.println("Staff member id is :"+id);

}
}
class Faculty
{
    String department;

    public Faculty(String name,int id,String department)
    {
       super(name,id);
        this.department=department;
    }
    public void techSubjrct()
    {
        super.displayInfo();
        System.out.println("Department of faculty member  is teaching subject :"+department);
    }
}
 class Proffessor
{
    String researchArea;

    public class (String name ,int id,String faculty,String researchArea)
    {
        super(name,id,faculty)
        this.researchArea=researchArea;
    }
    public void conductResearch()
    {
        super.displayInfo();
        System.out.println("Research conduct is Research paper :+researchArea");
    }
}
public class StaffManagementSystemTester
{
	public static void main(String[] args) {
    Proffessor swap=new Proffessor();
    swap.conductResearch();
	}

}

