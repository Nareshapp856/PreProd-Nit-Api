public class Student{
    String name;
    double marks;
    public void diplayDetails()
    {
        System.out.println("student Name:"+name);
         System.out.println("student Marks:"+marks);
    }
    public void updatedMarks(double newMarks)
    {    
       System.out.println("student Update Marks:"+newMarks);
    }
    public void hasPassed()
    {
        if(marks>50)
        {
            System.out.println("True");
        }
        else{
             System.out.println("False");
        }

    }
    public  void calculateGrade()
    {
      if(marks>=85)
      {
       System.out.println("A"); 
      }
      else if(marks>=70||marks==84)
      {
         System.out.println("B");
      }
       else if(marks>=50||marks==69)
      {
         System.out.println("C");
      }
     else
      {
         System.out.println("F");
      }
    }
    public static void main()
    {
        Student s1=new Student();
        s1.name="Kathy";
        s1.marks=72;
        s1.diplayDetails();
        s1.updatedMarks(88);
        s1.hasPassed();
        s1.calculateGrade();
    }

}