public class Student{
     String name;
     double marks;
    
     public void updateMarks( double newMarks){
        System.out.println("After updating marks to "+newMarks);
        System.out.println("Student Name: "+name+", Marks: "+marks);

     }
     public void hasPassed(){
        boolean flag;
        if(marks>=50)
        {
            flag=true;
            System.out.println(flag);
        }
        else
        {
            flag=false;
            System.out.println(flag);
        }
     }
     public void calculateGrade(){
          if(marks>=85)
          {
            System.out.println("A");
          }
          else if(marks<85 && marks>=70)
          {
            System.out.println("B");
          }
          if(marks<70 && marks>=50)
          {
            System.out.println("C");
          }
          else
          {
            System.out.println("F");
          }
     }
      public void displayDetails(){
        System.out.println("Student Name"+name+", Marks: "+marks);
        updateMarks();
        hasPassed();
        calculateGrade();
     }
    public static void main(String args[])
    {
        Student s1=new Student();
        s1.marks=72;
        s1.name="Kathy";

    }
}