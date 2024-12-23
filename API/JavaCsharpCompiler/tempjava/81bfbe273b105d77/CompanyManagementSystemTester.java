package test;
class Employee {
     String name;
    int id;

    public Employee(String name, int id){
                       this.name=name;
                       this.id=id;
    }

    public void displayInfo(){
        System.out.println("Name="+ this.name);
        System.out.println("id="+ this.id);
    }
   
}
class Manager extends Employee{
     String department;
     
     public Electronics(String name, int id ,String department){
        super(name,id);
        this.department=department;
     }

     public void manageTeam(){
         System.out.println("Name="+ name);
           
        System.out.println("id="+ id);
        System.out.println("department="+ department);
     }
    
    
}

class SeniorManage extends Manager{
    int numTeams;


    public SeniorManage(String name, int id ,String,int numTeams){
        super(name,id);
        this.numTeams=numTeams;
     }
     
     public void handleMultipleTeams(){
          System.out.println("Name="+name);
        System.out.println("id="+ id);
         System.out.println("Number of teams="+ numTeams);
        
     }
}

public class CompanyManagementSystemTester{
    public static void main(String[] args){
        Employee e=new Employee("Watch",5000,"Fastrack");
        e.displayInfo();
     
    
        Manager c= new Manager("Jeans",3000,"30");
        c.manageTeam();
        
        SeniorManage s=new SeniorManage("Sudeep",111,"it",5);
        s.handleMultipleTeams();
    }
}
