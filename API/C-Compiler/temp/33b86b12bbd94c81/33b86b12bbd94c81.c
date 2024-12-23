#include <stdio.h>

int main() {
    int marks[5], total = 0;
    float percentage;
    char grade;

   
    // printf("Enter the marks for 5 subjects (between 0 and 100):\n");
    for (int i = 0; i < 5; i++) {
        printf("Subject %d: ", i + 1);
        scanf("%d", &marks[i]);

        
        if (marks[i] < 0 || marks[i] > 100) {
            printf("Invalid input. Marks for each subject must be between 0 and 100.\n");
            return 0;  /
        }
    }

    for (int i = 0; i < 5; i++) {
        if (marks[i] < 35) {
            printf("Fail\n");
            return 0; 
        }
    }


    for (int i = 0; i < 5; i++) {
        total += marks[i];
    }
    percentage = (float)total / 5;


    if (percentage >= 90) {
        grade = 'A';
    } else if (percentage >= 75) {
        grade = 'B';
    } else if (percentage >= 50) {
        grade = 'C';
    } else if (percentage >= 35) {
        grade = 'D';
    }

    printf("Total Marks: %d\n", total);
    printf("Percentage: %.1f%%\n", percentage);
    printf("Grade: %c\n", grade);

    return 0;
}
