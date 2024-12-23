class Teacher{
    String name;
    int id;
    String specialization;
    public Teacher(String name, int id,String specialization){
        this.name=name;
        this.id=id;
        this.specialization=specialization;
    }
    public void displayDetails(){
        System.out.println("name:"+name);
        System.out.println("id:"+id);
        System.out.println("specialization:"+specialization);
    }
}
class ClassDetails extends  Teacher{
    String className;
    int numberOfStudents;
    public ClassDetails(String name, int id,String specialization,String className,int numberOfStudents){
        super(name,id,specialization);
        this.className=className;
        this.numberOfStudents=numberOfStudents
    }
    public void displayClassDetails(){
        System.out.println("className:"+className);
        System.out.println("numberOfStudents:"+numberOfStudents);
    }
}
public class TeacherTester{
    public static void main(String[] args){
        ClassDetails c=new ClassDetails("Jane Smith",301,"Physics","10th Grade",40);
        c.displayClassDetails();
        c.displayDetails();
    }
}