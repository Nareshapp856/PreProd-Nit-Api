class Staff
{
    String name;
    int id;
    public Staff(String name,int id){
        this.name=name;
        this.id=id;
    }
    public void displayInfo(){
                System.out.println("name is: "+name);
        System.out.println("id is: "+id);
    }
}
class Faculty extends Staff{
    String dept;
    public Faculty(String name,int id){
        super(name,id);
        this.dept=dept;

    }
    public void conductResearch(){
super.displayInfo();
System.out.println("department is: "+dept);
    }
}
class Professor extends Faculty{
    String reasearcharea;
    public Professor(String name,int id,String dept,String reasearcharea){
        super(name,id,dept);
        this.reasearcharea=reasearcharea;
    }
    public void conductResearch(){
        super.conductResearch();
        System.out.println("reasearcharea is: "+reasearcharea);
    }
  }

  public class StaffManagementSystemTester{
    public static void main(String []args){
      Professor p=new Professor("john",101,"it","hyd");
      p.conductResearch();
    }
  }