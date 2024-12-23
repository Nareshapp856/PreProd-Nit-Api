#include <stdio.h>

int main() {
    char operator;
    float num1, num2, result;
    printf("Enter a operator (+, -, *, /): ");
    scanf(" %c", &operator);
    printf("Enter first number: ");
    scanf("%f", &num1);
    printf("Enter second number: ");
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
            result = num1 * num2;
            printf("Multiplication is: %.2f\n", result);
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
                printf
            break;
    }

    return 0;
}
