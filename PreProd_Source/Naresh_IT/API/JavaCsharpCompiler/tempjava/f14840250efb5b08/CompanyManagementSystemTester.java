class Employee{
    String name;
    int id;

    Employee(String name, int id){
        this.name = name;
        this.id = id;
    }

    void displayInfo(){
        System.out.println("Employee name : " + this.name);
        System.out.println("Employee id : " + this.id);
    }
}

class Manager extends Employee{

    String department;

    Manager(String name, int id, String department){
       super(name, id);
       this.department = department;
    }

    void manageTeam(String name){
        super.displayInfo();
        String mname = name;
        System.out.println("Manager name : " + mname);
        System.out.ptintln("Department : " + this.department);
    }
}

class SeniorManager extends Manager{

    int numTeams;

    SeniorManager(String name, int id, String department, int teams){
        super(name, id, department);
        this.numTeams = teams;
    }

    void handleMultipleTeams(){
        super.manageTeam("Scott");
        System.out.println("Number of teams manage by the senior manager : " + this.numTeams);
    }
}

public class CompanyManagementSystemTester{
    public static void main(String[] args){

        SeniorManager sm = new SeniorManager("Scott", 123, "IT", 5);
        sm.handleMultipleTeams();
    }
}