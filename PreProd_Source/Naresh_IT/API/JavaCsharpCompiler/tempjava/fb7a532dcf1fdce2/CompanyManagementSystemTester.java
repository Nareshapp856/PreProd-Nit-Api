class Employee{
    String name;
    int id;
    Employee(String name,int id){
        this.name=name;
        this.id=id;
    }
    void displayInfo(){
        System.out.println("Employee name :"+name+", "+"id :"+id);
    }
}

class Manager extends Employee{
    String department;
    Manager(String name,int id,String department){
        super(name,id);
        this.department=department;
    }
    void manageTeam(){
        System.out.println("manager name :"+name+","+"department :"+department);
    }
}

class SeniorManager extends Manager{
    int numTeam;
    SeniorManager(String name,int id,String department,int numTeam){
        super(name,id,department);
        this.numTeam=numTeam;
    }
    void handelTeams(){
        System.out.println("SeniorManager name :"+name+","+"numTeams he handles :"+numTeam);
    }
}

public class CompanyManagementSystemTester{
    public static void main(String[] args){
        Manager m1=new Manager("ram",123,10);
        m1.displayInfo();
        SeniorManager sm1=new SeniorManager("Ragu",23,10,5);
        sm1.displayInfo();
    }
}