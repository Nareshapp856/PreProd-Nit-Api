package New.m1;

class employee{
    String name;
    int empid;

    employee(String name,int empid)
    {
        this.name=name;
        this.empid=empid;

    }
     public void Displayinfo()
    {
        System.out.println("emp name :"+name);
        System.out.println("emp id:"+empid);
    } 


}
class manager extends employee
{
    String Department;
    manager(String name,int empid,String Department)
    {
        super(name,empid);
        this.Department=Department;
    }
    public void manageTeam()
    {
        System.out.println("m name"+name);
         System.out.println("m department"+Department);
        

    }
}
class seniour extends manager
{
    int noOfTeam;
    seniour(String name,int empid,String department,int noOfTeam)
    {
        super(name,empid,department);
        this.noOfTeam=noOfTeam;
    }
        public void handleMultipleTeams()
        {
            System.out.println("no if teams :"+noOfTeam);
        }    
}
class CompanyManagementSystemTester
{
    public static void main(String [] args)
    {
        seniour s=new seniour("ram",1,"worker",5);
        s.handleMultipleTeams();
        s.Displayinfo();
    }
}
