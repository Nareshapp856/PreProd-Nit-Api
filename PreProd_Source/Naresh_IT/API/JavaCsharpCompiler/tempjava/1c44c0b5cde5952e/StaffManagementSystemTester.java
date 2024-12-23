class Staff{

    String name;
    int id;

    Staff(String n,int i){
        this.name=n;
        this.id=i;
    }
    public void displayInfo(){
        System.out.println("Name = "+name+" Id = "+id);
    }
}

class Faculty extends Staff{

    String department;

    Faculty(String n,int i,String d){
        super(n,i);
        this.department=d;
    }
    public void teachSubject(){
        System.out.println("Department = "+department);
    }


}
class Professor extends Faculty{

    String researchArea;
    Professor(String n,int i, String d,String r){
        super(n,i,d);
        this.researchArea=r;
    }
    public void conductResearch(){
        System.out.println("researchArea = "+researchArea);
    }


}








public class StaffManagementSystemTester{

    public static void main(String arg[]){

        Professor p = new Professor("Saumy",102,"CSE","ML");
    p.displayInfo();
    p.teachSubject();
    p.researchArea();
    }    
    

}