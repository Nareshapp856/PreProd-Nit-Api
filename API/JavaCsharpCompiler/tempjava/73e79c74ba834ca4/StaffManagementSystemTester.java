class Staff{
    String name;
    int id;
    public Staff( String name, int id){
        this.name=name;
        this.id=id;
    }
    public void displayInfo(){
        System.out.println("name= "+name);
        System.out.println("id= "+id);

    } 


}
class Faculty extends Staff{
    String department;
    public Faculty( String name,int id,String department){
        super(name, id);
        this.department=department;
    }
    public void teachSubject(){
        
          System.out.println         ("department faculty member is teaching= "+department);


    }



}
class Professor extends Faculty {;
    String researchArea;
    public Professor(String name,int id,String department, String researchArea){
        super(name,id,department);
        this.researchArea=researchArea;
    }
    public void conductResearch(){
        System.out.println("researchArea= "+researchArea);
    }


}
public class StaffManagementSystemTester{
    public static void main(String args[]){
        Professor obj=new Professor("naveen",123,"EEE","control System");
        obj.displayInfo();
        obj.teachSubject();
        obj.conductResearch();


    }
}