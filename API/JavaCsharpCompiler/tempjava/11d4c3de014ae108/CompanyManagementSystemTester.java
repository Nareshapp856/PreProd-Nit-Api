class Employee{
    String name;
    int id;
    public Employee(String name,int id){
        this.name=name;
        this.id=id;

    }
    public void displayInfo(){
        System.out.println("name:"+name);
        System.out.println("id:"+id);
    }
}
class Manager extends Employee{
    String department;
    public Manager(String name,int id,String department){
        super(name,id);
        this.department=department;
    }
    public void manageTeam(){
        System.out.println(name+"manage"+department);
    }
}
class SeniorManager extends Manager{
    int numTeam;
    public SeniorManager(String name,int id,String department, int numTeam){
        super(name,id,department);
        this.numTeam=numTeam;
    }
    public void handleMultipleTeams(){
         System.out.println(numTeam+"number of teams managed by the senior manager");
    }

}
public class CompanyManagementSystemTester{
    public static void main(String[] args){
        SeniorManager s=new SeniorManager("piku",123,"lab",4);
        s.displayInfo();
        s.manageTeam();
        s.handleMultipleTeams();
    }
}