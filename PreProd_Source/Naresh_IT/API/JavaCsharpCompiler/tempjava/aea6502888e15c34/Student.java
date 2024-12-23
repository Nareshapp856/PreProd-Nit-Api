public class Student{
    String name;
    double marks;
    public  void displayDetails()
    {
      System.out.println("Name :"+name);
       System.out.println("marks"+marks);
    }
    public void updateMarks(double newMarks)
    {
      marks=marks+newMarks;
    }
    public  void hasPassed()
    {
      if(marks>=50)
      {
        System.out.println("Has the student passed ? Ture");

      }
      else
      {
        System.out.println("Has the student passed ? False"); 
      }
      
    }
    public  void calculateGrade()
    {
      if(marks>=85)
      {
        System.out.println(" Grade : A");
      }
       else if(marks<=85 && marks>=70)
      {
        System.out.println(" Grade : B");
      }
      else if(marks<=69 && marks>=50)
      {
        System.out.println(" Grade : C");
      }
      else
      {
        System.out.println(" Grade : F");
      }
    }
    public static void main( String []args)
    {
       
      Student s1= new Student();
      s1.name="Kathy";
      s1.marks=72;
      s1.displayDetails();
      System.out.println(" After updating marks to 88:");
      s1.updateMarks(88);
      s1.hasPassed();
      s1.calculateGrade();
        
    }

    
}