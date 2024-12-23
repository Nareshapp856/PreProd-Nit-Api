

class Teacher{
    private String name;
    private int id;
    private String specilization;

    public Teacher(){
        this.setName("Unknown");
        this.setId(0);
        this.setSpecilization("General");
    }
    public Teacher(String name,int id,String specilization){
        this.setName(name);
        this.setId(id);
        this.setSpecilization(specilization);
    }
    public void displayDetails(){
        System.out.println("Name:"+getName());
        System.out.println("id:"+getId());
        System.out.println("specilization:"+getSpecilization());
    }
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSpecilization() {
		return specilization;
	}
	public void setSpecilization(String specilization) {
		this.specilization = specilization;
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
        System.out.println("Name:"+getName());
        System.out.println("id:"+getId());
        System.out.println("specilization:"+getSpecilization());
        System.out.println("className:"+className);
        System.out.println("numberOfStudents:"+numberOfStudents);
    }
}
public class TeacherTester{
    public static void main(String[] args){
    ClassDetails c=new ClassDetails("Jane Smith",301,"pysics","10",40);
    c.displayClassDetails();
    }
}