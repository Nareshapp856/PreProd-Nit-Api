public class Student{
    String name;
    double marks;
    public static void displayDetails()
    {
      System.out.println("name"+name);
       System.out.println("marks"+marks);
    }
    public static void updateMarks(double newMarks)
    {
      marks=marks+newMarks;
    }
    public static void hasPassed()
    {
      if(marks>=50)
      {
        System.out.println("Ture");

      }
      else
      {
        System.out.println("Ture"); 
      }
      
    }
    public static void calculateGrade()
    {
      if(marks>=85)
      {
        System.out.println(" Grade : A");
      }
      ifelse(marks<=85 && marks>=70)
      {
        System.out.println(" Grade : B");
      }
      ifelse(marks<=69 && marks>=50)
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
      s1.name="Naresh";
      s1.marks=72;

      s1.displayDetails();
      s1.updateMarks(88);
      s1. hasPassed();
      s1.calculateGrade();
        
    }

    
}