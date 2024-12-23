#include <stdio.h>

int main() {
    char operator;
    float num1, num2, result;

    // Prompt the user to enter an operator
    printf("Enter an operator (+, -, *, /): ");
    scanf("%c", &operator); // Read the operator

    // Prompt the user to enter two numbers
    printf("Enter first number: ");
    scanf("%f", &num1); // Read the first number

    printf("Enter second number: ");
    scanf("%f", &num2); // Read the second number

    // Perform the calculation based on the operator
    switch (operator) {
        case '+':
            result = num1 + num2;
            printf("Addition is: %.2f\n", result);
            break;
        
        case '-':
            result = num1 - num2;
            printf("Subtraction is: %.2f\n", result);
            break;
        
        case '*':
            result = num1 * num2;
      
