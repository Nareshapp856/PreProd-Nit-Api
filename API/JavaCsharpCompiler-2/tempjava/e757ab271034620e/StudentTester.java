abstract class Student {
    protected String studentName;
    protected String studentClass;
    protected static int totalNoOfStudents = 0;

    public Student() {
        totalNoOfStudents++;
    }

    public Student(String name, String studentClass) {
        this.studentName = name;
        this.studentClass = studentClass;
        totalNoOfStudents++;
    }

    abstract public int getPercentage();

    public static int getTotalNoOfStudents() {
        return totalNoOfStudents;
    }
}

class ScienceStudent extends Student {
    private int physicsMarks;
    private int chemistryMarks;
    private int mathsMarks;

    
    public ScienceStudent(String name, String studentClass, int physicsMarks, int chemistryMarks, int mathsMarks) {
        super(name, studentClass);
        this.physicsMarks = physicsMarks;
        this.chemistryMarks = chemistryMarks;
        this.mathsMarks = mathsMarks;
    }

    @Override
    public int getPercentage() {
        return (physicsMarks + chemistryMarks + mathsMarks) / 3;
    }
}

class HistoryStudent extends Student {
    private int historyMarks;
    private int civicsMarks;

    public HistoryStudent(String name, String studentClass, int historyMarks, int civicsMarks) {
        super(name, studentClass);
        this.historyMarks = historyMarks;
        this.civicsMarks = civicsMarks;
    }

    @Override
    public int getPercentage() {
        return (historyMarks + civicsMarks) / 2;
    }
}

public class StudentTester {
    public static void main(String[] args) {
        ScienceStudent scienceStudent = new ScienceStudent("Alice", "10th Grade", 85, 90, 95);
        HistoryStudent historyStudent = new HistoryStudent("Bob", "10th Grade", 80, 70);

        System.out.println(scienceStudent.studentName + " has a percentage of: " + scienceStudent.getPercentage() + "%");
        System.out.println(historyStudent.studentName + " has a percentage of: " + historyStudent.getPercentage() + "%");
        
        System.out.println("Total number of students: " + Student.getTotalNoOfStudents());
    }
}
