class Teacher{
    private String name;
    private int id;
    private String specilization;
    Teacher(){
        name="Unkown";
        id=0;
        specilization= "General";
    }

    Teacher("Modassir",123,"English"){
      this.name=name;
      this.id=id;
      this.specilization=specilization;
    }

    public void displayDetails(){
        System.out.println("Name: "+name);
        System.out.println("ID: "+id);
        System.out.println("Specialization: "+specialization);
    }
}

class Subject extends Teacher{
    private String subjectName;
    Subject(){
      subjectName="Not Assigned";  
    }
    Subject("Aman",1234,"Math");
{

}
public void displaySubject(){
    super.displayDetails();
}
}

public class Tester{
    public static void main(String[]args){

    }
}