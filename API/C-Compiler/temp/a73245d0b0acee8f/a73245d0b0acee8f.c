def determine_grade():
    # Taking inputs for the five subjects
    try:
        subject1 = int(input("Subject 1: "))
        subject2 = int(input("Subject 2: "))
        subject3 = int(input("Subject 3: "))
        subject4 = int(input("Subject 4: "))
        subject5 = int(input("Subject 5: "))
    except ValueError:
        print("Invalid input. Please enter valid integer marks.")
        return

    # Check if all marks are within the valid range of 0-100
    marks = [subject1, subject2, subject3, subject4, subject5]
    if any(mark < 0 or mark > 100 for mark in marks):
        print("Invalid input. Marks for each subject must be between 0 and 100.")
        return
    
    # Check if any subject mark is below 35
    if any(mark < 35 for mark in marks):
        print("Fail")
        return
    
    # Calculate the total marks and percentage
    total_marks = sum(marks)
    percentage = (total_marks / 500) * 100
    
    # Determine th
