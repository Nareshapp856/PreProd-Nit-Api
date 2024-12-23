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
    System.out.println("Name :"+name);
    System.out.println("Id :"+id);
  }
}
// Faculty 

class Faculty extends Staff
{
    String departement;
    public Faculty( String name,int id,String departement)
    {
        super( name,id);
    }
    public void teachSubject()
    {
        super. displayInfo();
        System.out.println("Departement :"+departement);
    }
}

//Professor

class Professor extends Faculty
{
    String researchArea;
    public Professor(String name,int id,String departement,String researchArea)
    {
        super(name,id,departement);
        this.researchArea=researchArea;
    }
public void  conductResearch()
{
    super.teachSubject();
    System.out.println("ResearchArea :"+ researchArea);
}
} 


public class StaffManagementSystemTester
{
    public static void main(String[]args)
    {
Professor p = new Professor("Maran",123,"Science","Naresh it");
p.conductResearch();
System.out.println();
Faculty f= new Faculty("Manvith",256,"Science")
f.teachSubject();
    }
}