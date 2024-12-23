 class StaffManagement{
    String name;
    int id;
    public StaffManagement(String name,int id){
        super();
        this.name=name;
        this.id=id;
    }
    public void displayInfo(){
        System.out.println("name:"+name);
        System.out.println("id:"+id);
    }
}
class Faculty extends StaffManagement{
    String department;
    public Faculty(String name,int id,String department){
        super(name, id);
        this.department=department;
    }
    public void teachSubject(){
        super.teachSubject();
        System.out.println("department:"+department);
    }
}
class Professor extends Faculty{
    String researchArea;
    public Professor(String name,int id,String department,String researchArea){
        super(name,id,department);
        this.researchArea=researchArea;
    }
    public void conductResearch(){
        super.conductResearch();
        System.out.println("researchArea:"+researchArea);
    }
}
public class StaffManagementSystemTester{
    public static void main(String[] args){
Faculty f1=new Faculty("ashu",101,"It");
f1.displayInfo();
Professor p1=new Professor("vaish",102,"it","book");
p1.conductResearch();
    }
}

