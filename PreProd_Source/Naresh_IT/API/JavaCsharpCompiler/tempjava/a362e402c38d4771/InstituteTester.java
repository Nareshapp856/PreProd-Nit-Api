class Descriptions {
    String batchName , timing; 
    static String department = "CSE";

    public void Student()  {
        String name = "John Doe" , batch;
        int rollNumber = 101;
        System.out.printlin("Name:  "+name);
        System.out.printlin("Roll Number: "+rollNumber);   
    }

    public void BatchManager()  {

    }

    public static void main(String []args) {
        Descriptions D = new Descriptions();
        D.batchName = "Morning Batch";
        D.timing = "8 AM - 12 PM";
        System.out.printlin("Batch Details : ");
        System.out.printlin("Batch Name : "+batchName);
        System.out.printlin("Timing : "+timing);
                
        System.out.printlin("Student Details: ");
        D.Student();

        System.out.printlin("Current Batch Details:");
        System.out.printlin("Department: "+D.department);
        System.out.printlin("Batch Name:: "+D.batchName);
        System.out.printlin("Timing : "+D.Timing);
        
    }
}