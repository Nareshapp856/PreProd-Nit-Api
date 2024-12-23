def get_marks():
    marks = []
    for i in range(1, 6):
        while True:
            try:
                mark = float(input(f"Subject {i}: "))
                if 0 <= mark <= 100:
                    marks.append(mark)
                    break
                else:
                    print("Invalid input. Marks for each subject must be between 0 and 100.")
            except ValueError:
                print("Invalid input. Please enter a numeric value.")
    return marks

def calculate_results(marks):
    # Check for failing marks
    if any(mark < 35 for mark in marks):
        return "Fail"
    
    # Calculate total and percentage
    total_marks = sum(marks)
    percentage = (total_marks / 500) * 100  # 500 is the maximum total (100 * 5)
    
    # Determine grade
    if percentage >= 90:
        grade = 'A'
    elif percentage >= 75:
        grade = 'B'
    elif percentage >= 50:
        grade = 'C'
    elif percentage >= 35:
        grade = 'D'
    
    return total_marks, percentage, grade

def main():
    marks = get_marks()
    result = calculate_results(marks)
    
    if result == "Fail":
        print(result)
    else:
        total_marks, percentage, grade = result
        print(f"Total Marks: {total_marks}")
        print(f"Percentage: {percentage:.1f}%")
        print(f"Grade: {grade} (Valid)")

if __name__ == "__main__":
    main()