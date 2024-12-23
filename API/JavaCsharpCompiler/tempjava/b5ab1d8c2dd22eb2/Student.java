public class Student{
  
  public void displayDetails(){
  String name="Kathy";
  double marks=72;
  System.out.print("Student Name:"+name);
  System.out.println(",Marks:"+marks);
  }
  public void updateMarks(double newMarks){
    //newmarks=88;
  System.out.print("After updating marks to");
  System.out.println(",Marks:");
  }
public void hasPassed(){
  int marks=40;
  if( marks>=50){
    System.out.println("Has the student passed ? true");
  }
}
public void calculateGrade(){
  int marks=88;
if(marks==88){
      System.out.println("Student's Grade: A");
  }
}
public static void main(String[] args){
  Student s1=new Student();
  s1.displayDetails();
  s1.updateMarks(88);
  s1.hasPassed();
  s1.calculateGrade(88);
}
}