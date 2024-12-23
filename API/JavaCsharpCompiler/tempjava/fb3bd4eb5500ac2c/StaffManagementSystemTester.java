
class Staff {
    protected String name;
    protected int id;

    public Staff(String name, int id) {
        this.name = name;
    }
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
    }
}
class Faculty extends Staff {
    private String department;

    public Faculty(String name, int id, String department) {
        super(name, id);
        this.department = department;
    }

    public void teachSubject() {
        System.out.println("Teaching in " + department + " department.");
    }
}

class Professor extends Faculty {
    private String researchArea;

    public Professor(String name, int id, String department, String researchArea) {
        super(name, id, department);
        this.researchArea = researchArea;
    }

    public void conductResearch() {
        System.out.println("Conducting research in " + researchArea + ".");
    }
}

public class StaffManagementSystemTester {
    public static void main(String[] args) {
     
        Professor professor = new Professor("John Doe", 1234, "Computer Science", "Artificial Intelligence");

        professor.displayInfo();
        professor.teachSubject();
        professor.conductResearch();
    }
}
