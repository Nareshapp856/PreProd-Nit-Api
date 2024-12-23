#include <stdio.h>

int main() {
    char operator;
    float num1, num2, result;

    
    printf("Enter an operator (+, -, *, /):+ ");
    scanf("%c", &operator); 

   
    printf("Enter first number:5 ");
    scanf("%f", &num1); 

    printf("Enter second number:2 ");
    scanf("%f", &num2); 

   
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
            
    printf("Enter an operator (+, -, *, /):* ");
    scanf("%c", &operator); 

   
    printf("Enter first number:10 ");
    scanf("%f", &num1); 

    printf("Enter second number:5 ");
    scanf("%f", &num2); 

      return() 0;
    }
