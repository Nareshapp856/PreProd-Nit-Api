class Employee{
    String name;
    int id;
public Employee(String name,int id){
    this.name=name;
    this.id=id;
}
public void displayInfo(){
    System.out.println("Employee's name: "+name);
    System.out.println("Employee's ID: "+id);
}
}
Class Manager extends Employee{
    String department;
public Manager(String name,int id,String department){
    super(name,id);
    this.department=department;
}
public void manageTeam(){
    System.out.println("Manager's Name: "+name);
    System.out.println("Manager's Department: "+department);
}
}
class SeniorManager extends Manager{
    int numTeams;
public SeniorManager(String name,int id,String department,int numTeams){
    super(name,id,department);
    this.numTeams=numTeams;
}
public void handleMultipleTeams(){
    System.out.println("No.of Teams Handled by Manager: "+numTeams);
}
}
public class Main{
    public static void main(String [] args){
        SeniorManager s=new SeniorManager("Sid",121,"HR",3);
        s.displayInfo();
        s.manageTeam();
        s.handleMultipleTeams();
    }
}