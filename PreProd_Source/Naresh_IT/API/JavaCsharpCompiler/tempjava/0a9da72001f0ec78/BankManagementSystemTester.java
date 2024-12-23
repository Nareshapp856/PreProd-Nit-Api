
class Staff
    def __init__(self, name, id):
        self.name = name
        self.id = id
    
    def displayInfo(self):
        print(f"Staff Name: {self.name}, ID: {self.id}")
        

class Faculty(Staff):
    def __init__(self, name, id, department):
        super().__init__(name, id)  # Call the constructor of the Staff class
        self.department = department
    
    def teachSubject(self):
        print(f"{self.name} teaches in the {self.department} department.")

class Professor(Faculty):
    def __init__(self, name, id, department, researchArea):
        super().__init__(name, id, department)
        self.researchArea = researchArea
    
    def conductResearch(self):
        print(f"{self.name} is conducting research in the area of {self.researchArea}.")

class StaffManagementSystemTester
    def run(self):
        professor = Professor(name="Dr. Alice Johnson", id=12345, department="Computer Science", researchArea="Artificial Intelligence")
        
        
        professor.displayInfo()  
        professor.teachSubject()  
        professor.conductResearch()  


if __name__ == "__main__":
    tester = StaffManagementSystemTester()
    tester.run()