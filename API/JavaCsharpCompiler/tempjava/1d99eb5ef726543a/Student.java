public class Student{
    String name;
    double marks;
    public void displayDetails(){
        System.out.println("Student Name:"+name=", Marks:"+marks);
        System.out.println("After updating marks to:");
        System.out.println("Student Name:"+name=", Marks:"+marks);
        System.out.println("Student's Grade: A");
        
    }
    public void updateMarks(double newMarks){
        marks=newMarks;
    }
    public void hasPassed(){
        if(marks>50){System.out.println("ture");}
    }
    public void calculateGrade(){
        if(marks>85){System.out.println("Student's Grade: A");}
        else if(marks>74&&marks<84){System.out.println("Student's Grade: B");}
        else if(marks>50 && marks<69){System.out.println("Student's Grade: C");}
        else(marks<50) {System.out.println("Student's Grade: F");}
    }
    public static void main(String[] args){
        Student s1=new Student();
        s1.displayDetails();
        s1.name=kathy;
        s1.marks=72;
        s1.updateMarks(88.0);
        s1.hasPassed();
    }
}