class Teacher
{
private String name; 
private String area;
    private int id;
        
        public Teacher(){
            this.name = "Unknown";
            this.id = 0;
            this.area ="General";
        }
    public Teacher(String name,int id,String area)
    {
        this.name= name;
        this.id =id;
        this.area = area;
    }
    void displayDetails() {
        
        System.out.println("Name : "+name);
        System.out.println(" id :"+id );
        System.out.println("Area : "+area);
    }
  
    }
      class ClassDetails
      {
        private String className;  
        private int numberOfStudents;

        public ClassDetails(){
            this.className = "Not Assigned";
            this.numberOfStudents = 0;
        }

        public ClassDetails(String name, int id, String area, 
                        String className,int numberOfStudents)
        {
            super(String name,int id,String area)
            this.className = className;
            this.numberOfStudents = numberOfStudents;
        }

        void displayClassDetails()
        {     
              displayDetails();
              System.out.println();
              System.out.println("Class Name : "+className);
              System.out.println("Number of Students : "+numberOfStudents);
        }
      }
      public class TeacherTester
      {
        public static void main(String [] args)
        {
            ClassDetails c1 = new ClassDetails("tanmay",201,"Mathematics","10th",60);
            c1.displayClassDetails();
        }
      }
