class Employee{
    String name;
    int id;
    Employee(String name,int id){
        this.name=name;
        this.id=id;
    }
    public void displayinfo(){
        System.out.println("name of the employee"+name);
        System.out.println("id of the employee"+id);
    }
}
class Manager extends Employee{
    String dept;
    Manager(String name,int id,String dept){
        super(name,id);
        this.dept=dept;
    }
    public void manageteam(){
        System.out.println("name of the employeeis"+name);
        System.out.println("managed dept"+dept);
    }
}
class SeniorManager extends Manager(){
    int numteams;
    SeniorManager(String name,int id,String dept,int numteams){
        super(name,id,dept);
        this.numteams=numteams;
    }
    public void multipleteams(){
        System.out.println("how many teams managed"+numteams);
    }
}
public class CompanyManagementSystemTester{
    public static void main(String[]args){
        SeniorManager sm=new SeniorManager("mrudula",121,"java",2);
        sm.displayinfo();
        sm.manageteam();
        sm.multipleteams();

    }
}