class Staf
{
    String name;
    int id;

    public Staf(String name, int id){
        this.name=name;
        this.id=id;
    }
    public void displayInfo() {
        System.out.println("Name: "+name);
        System.out.println("ID:"+id);
    }
}
class Faculty extends Staf {
    String department;

    public Faculty(String name, int id, String department) {
        super(name, id);
        this.department = department;
    }

    public void teachSubject() {
        System.out.println("The faculty"+ name +" is teaching "+department);
    }
}
class Professor extends faculty{
    String researchArea;
    
}