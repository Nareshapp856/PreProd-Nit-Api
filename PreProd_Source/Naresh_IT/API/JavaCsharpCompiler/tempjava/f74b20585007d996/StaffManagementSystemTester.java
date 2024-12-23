class Staff {
    String name;
    int id;

    public Staff(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void displayInfo() {
        System.out.println("Name: " + this.name + ", ID: " + this.id);
    }
}

class Faculty extends Staff {
    String department;

    public Faculty(String name, int id, String department) {
        super(name, id);
        this.department = department;
    }

    public void teachSubject() {
        System.out.println("Department: " + this.department);
    }
}

class Professor extends Faculty {
    String researchArea;

    public Professor(String name, int id, String department, String researchArea) {
        super(name, id, department);
        this.researchArea = researchArea;
    }

    public void conductResearch() {
        System.out.println("Research Area: " + this.researchArea);
    }
}

public class StaffManagementSystemTester {
    public static void main(String[] args) {
        Professor professor = new Professor("Sunil Kumar", 12345, "CSE", "AI");
        professor.displayInfo();
        professor.teachSubject();
        professor.conductResearch();
    }
}
