class Teacher{
    private String name;
    private int id;
    private String specilization;

    public Teacher(){
        this.name="Unknown";
        this.id=0;
        this.specilization="General";
    }
    public Teacher(String name,int id,String specilization){
        this.name=name;
        this.id=id;
        this.specilization=specilization;
    }
    public void displayDetails(){
        System.out.println("Name:"+name);
        System.out.println("id:"+id);
        System.out.println("specilization:"+specilization);
    }

}
class ClassDetails extends Teacher{
    private String className;
    private int numberOfStudents;

    public ClassDetails(){
       this.className="Not Assigned";
       this.numberOfStudents=0;

    }
     public ClassDetails(String name,int id,String specilization,String className,int numberOfStudents){
        super(name,id,specilization);
        this.className=className;
        this.numberOfStudents=numberOfStudents;
    }

    public void displayClassDetails(){
        System.out.println("Name:"+name);
        System.out.println("id:"+id);
        System.out.println("specilization:"+specilization);
        System.out.println("className:"+className);
        System.out.println("numberOfStudents:"+numberOfStudents);
    }
}
public class TeacherTester{
    ClassDetails c=new ClassDetails("Jane Smith",301,"pysics","10",40);
    c.displayClassDetails();
}