public class Student{
    String name="Kathy";
    double marks=72;
    public void displayDetails(){
        System.out.println("Student Name: "+name);
         System.out.println("Marks: "+marks);

    }
    public void updateMarks(double newMarks) {
        System.out.println("After updating marks to 88:");
        System.out.println("Student Name: "+name);
         System.out.println("Marks: "+newMarks);

    }
    public void hasPassed(){
        if(marks<=50){
            System.out.println("Passed");
        }
        else {
            System.out.println("Failed");

    }    
    }
public void calculateGrade(){
    if(marks<=85){
        System.out.println("A");
    }
    else if(marks<=70){
        System.out.println("B");
    }
    else if(marks<=50){
        System.out.println("C");
    }
    else{
        System.out.println("F");
    }
}
public static void main(String [] args){
    Student b1=new Student();
    b1.displayDetails();
    b1.updateMarks(88);
    b1.hasPassed();
    b1.calculateGrade();
}
}