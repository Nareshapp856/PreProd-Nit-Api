def main():
    # Input marks for five subjects
    try:
        marks = []
        for i in range(1, 6):
            mark = float(input(f"Subject {i}: "))
            if mark < 0 or mark > 100:
                print("Invalid input. Marks for each subject must be between 0 and 100.")
                return
            marks.append(mark)
        
        # Check if any mark is below 35
        if any(mark < 35 for mark in marks):
            print("Fail")
            return
        
        # Calculate total marks and percentage
        total_marks = sum(marks)
        percentage = (total_marks / 500) * 100
        
        # Determine grade based on percentage
        if 90 <= percentage <= 100:
            grade = 'A'
        elif 75 <= percentage < 90:
            grade = 'B'
        elif 50 <= percentage < 75:
            grade = 'C'
        elif 35 <= percentage < 50:
            grade = 'D'
        else:
            grade = 'Fail'
        
        # Display results
        print(f"Total Marks: {total_marks}")
        print(f"Percentage: {percentage:.1f}%")
        print(f"Grade: {grade}")
    
    except ValueError:
        print("Invalid input. Please enter valid numbers for marks.")

if __name__ == "__main__":
    main()
