#include <stdio.h>

int main() {
    char operator;
    float num1, num2, result;

   
    printf("Enter an operator (+, -, *, /): ");
    scanf("%c", &operator); 

    
    printf("Enter first number: ");
    scanf("%f", &num1); 

    printf("Enter second number: ");
    scanf("%f", &num2); 
    
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
      
