class Employee{
    String name;
    int id;

    public Employee(String name,int id){
        this.name=name;
        this.id=id;
    }
    public void displayInfo(){
        System.out.println("Name:"+name);
        System.out.println("Id:"+id);
    }
}
class Manager extends Employee{
    String department;

    public Manager(String name,int id,String department){
        super(name,id);
        this.department=department;
    }
    public void manageTeam{
        System.out.println("Name:"+name);
        System.out.println("Department:"+department);
    }
}
class SeniorManager extends Employee{
    int numTeams;

    public SeniorManager(String name,int id,int numTeams){
        super(name,id);
        this.numTeams=numTeams;
    }
    public void handleMultipleTeams(){
        System.out.println("number of teams managed:"+numTeams);
    }
}
public class CompanyManagementSystemTester{
    public static void main(String[] args){
        Employee emp=new Employee("Gopi",306760);
        emp.displayInfo();

        Manager mng=new Manager("Gopi",306760,"IT");
        mng.manageTeam();

        SeniorManager smg=new SeniorManager("Gopi",306760,3);
        smg.handleMultipleTeams();
    }
}