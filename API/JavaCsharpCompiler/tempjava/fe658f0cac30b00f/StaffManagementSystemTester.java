class Staff{
    protected String name;
    protected int Id;
    Staff(String name,int id){
        this.name=name;
        this.id=id;
    }
    public void display(){
        System.out.println("Name:"+name+"\n"+"Id:"+id);
        
    }

}
class Faculty extends Staff{
    protected String department;
    Faculty(String name,int id,String department){
        super(name,id);
        this.department=department;
    }
    public void teachSubject(){
        System.out.println("Teaching Subject:"department)
    }

}
class Professor extends Faculty{
    protected String reserchArea;
    Professor(String name,int id,String department,String reserchArea){
        super(name,id,department);
        this.reserchArea=reserchArea;
    }

    public void condouctReserch(){
        System.out.println("Reserch Area:"+reserchArea);
    }
}

public class StaffManagementSystemTester{
    public static void main(String args[]){
        Professor P=new Professor("Biswa",101,"Java","Adv.Java");
        p.display();
        p.teachSubject();
        p.reserchArea();
    }
}