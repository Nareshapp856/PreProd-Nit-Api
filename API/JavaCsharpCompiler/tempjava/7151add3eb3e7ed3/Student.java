public class Student{
  
  public void displayDetails(){
  String name="Kathy";
  double marks=72;
  System.out.print("Student Name:"+name);
  System.out.println(",Marks:"+marks);
  }
  public void updateMarks(double newMarks){
    newmarks=88;
  System.out.print("After updating marks to");
  System.out.println(",Marks:"+newmarks);
  }
public void hasPassed(){
  if(marks>=50){
    System.out.println("Has the student passed ? true");
  }
}
public void calculateGrade(){
  if(marks==72){
    System.out.println("Student's Grade: B");
  }else if(marks==88){
      System.out.println("Student's Grade: A");
  }
}
public static void main(String[] args){
  Student s1=new Student();
  s1.displayDetails();
  s1.updateMarks();
  s1.hasPassed();
  s1.calculateGrade();
}
}