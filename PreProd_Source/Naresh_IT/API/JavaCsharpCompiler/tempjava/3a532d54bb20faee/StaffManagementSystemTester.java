 class Staff
{
    string name;
    int id;
    string department;
    public Staff(string name,int id,  
string department)
    {
        this.name=name;
        this.id=id;
        this.department=department;
    }
    void displayInfo()
    {
        system.out.println("the name of the stff is :"+name);
        system.out.println("the name of the stff is :"+id);
    }
}
    class faculty extends Staff
    {
        public faculty(string name,int id,  
string department){
    super.name=name;
    super.id=id;
}
    
    void teachSubject()
    {
       system.out.println("department the faculty member is teaching");
    }
    }
 class Professor extends faculty{
    string researcharea;
    
    public Professor(string name,int id,  
string department){
    super.name=name;
    super.id=id;
    this.researcharea=researcharea;

}
    
void conductResearch()
{
    system.out.println(" research area of the professor");
}
}
 
public class StaffManagementSystemTester{
public  static void main (String [] args)
{
    Staff s1 = new Staff() 
    s1.displayInfo(xyz,100);
}
}
