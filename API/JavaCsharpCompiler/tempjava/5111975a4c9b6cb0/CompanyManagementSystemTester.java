class Employee{
    String name;
    int id;
    Employee(String name ,int id){
            this.name= name;
            this.id=id;

    }
    public void displayInfo(){
        System.out.println("employee name :"+this.name);
        System.out.println("employeeid :"+this.id);
    }
}
class Manager extends Employee{
    String department;
    Manager(String name,int id,String department){
        super(name,id);
        this.department=department;   
    }
    public void manageTeam(){
        System.out.println("manager name"+super.name);
        System.out.println("department name :"+this.department);
    }
}
class SeniorManager extends Manager{
    int numTeams;
    SeniorManager(String name,int id,String department,int numTeams){
        super(name,id);
        this.department=department;
        this.numTeams=numTeams;

    }
    public void handleMultipleTeams(){
            System.out.println("numTeams :"+this.numTeams);
    }
}
public Class CompanyManagementSystemTester(){
    public static void main(String [] args){
        SeniorManager s= new SeniorManager("ramesh",121,"production",4);
        s.displayInfo();
        s.manageTeam();
        s.andleMultipleTeams();

    }
}