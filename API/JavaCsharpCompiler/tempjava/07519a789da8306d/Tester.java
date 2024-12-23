

class Teacher
{
    String name;
    int id;
    String specialization;


    public Teacher(String name,int id,String specialization)
    {
        this.name=name;
        this.id=id;
        this.specialization=specialization;
    }

    public void displaydetails()
    {
     System.out.println("Teacher name is: "+name);
     System.out.println("Teacher id is: "+id);
     System.out.println("Teacher specialization is: "+specialization);

    }
}
class subject extends Teacher
{
    private String subname;

    public subject(String name,int id,String specialization,String subname)
    {
        super(name,id,specialization);
        this.subname=subname;
    }

    public void displaysubject()
    {
        super.displaydetails();
        System.out.println("Subject Name is: "+subname);
    }
}


public class Tester
{
    public static void main(String[]args)
    {
  subject s=new subject("John Doe","Algebra",201,"Mathematics");
  s.displaysubject();
    }
}