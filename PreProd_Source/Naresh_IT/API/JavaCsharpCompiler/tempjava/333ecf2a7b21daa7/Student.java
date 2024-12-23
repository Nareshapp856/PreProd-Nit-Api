public class  Student
{
	double addmarks;
	string studentName;
	

	public  void addmarks(double marks) 
	{
		total=total+marks;
		system.out.println("after addmarks: "+total);

	}
	public void deductmarks(double marks)
	{
		if(total>=marks)
		{
			total=total-marks;
		System.out.println("after deductmarks:"+total);
		}
		else
		{
				System.out.println("insufficient marks are available");
		}
	}
	public void displayStudentInfo()
	{
			System.out.println("student id:"+studentId);
				System.out.println("student name:"+studentName);
					System.out.println("total marks:"+ marks);
	}
  public static void main (string [] args)
		{
			student b=new Student();
			b. studentId="xyz";
            b.studentName=Drushti;
			b.totalMarks=(234);
		}
}
