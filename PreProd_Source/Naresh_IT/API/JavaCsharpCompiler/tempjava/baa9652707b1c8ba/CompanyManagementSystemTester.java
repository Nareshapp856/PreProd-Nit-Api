public class CompanyManagementSystemTester  {
   
    protected String name;
    protected int id;

   
    public CompanyManagementSystemTester(String name, int id) {
        this.name = name;
        this.id = id;
    }

  
    public void displayInfo() {
        System.out.println("Employee Name: " + name + ", ID: " + id);
    }
}
