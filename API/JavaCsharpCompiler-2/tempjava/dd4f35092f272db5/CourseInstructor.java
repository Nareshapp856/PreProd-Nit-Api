package pack1;
class Instructo {
	 private String instructoName;
		public  String getInstructoName() {
		return instructoName;
	}

	public Instructo(String instructoName) {
		super();
		this.instructoName = instructoName;
	}

	public String toString() {
		return "instructo [ instructoName=" + instructoName + "]";
	}
   
	

	}
	class Course{
		 private String courseCode;
		private String courseName;
		private Instructo i; 
		
		public String getName() {
			return courseName;
		}

		public Course(String courseName,String courseCode,Instructo i) {
			this.i=i;
			this.courseName = courseName;
			this.courseCode=courseCode;
		}

		@Override
		public String toString() {
			return "Course [courseCode=" + courseCode + ", courseName=" + courseName + "]";
		}
		
		
	}
public class CourseInstructor  {

	
	public static void main(String[] args) 
	{
		String courseName="java";
		String courseCode="java36";
		String instructoName="jaganath";
		Instructo i =new Instructo(instructoName);
		Course c = new Course(courseName, courseCode, i);
		//CourseInstructor c1 = new CourseInstructor();
		//Course c1 = new Course(courseName, courseCode, instructoName);
        System.out.println(" "+i.toString());
        System.out.println(" "+c.toString());
        	}

}
