#include<stdio.h>

int main() {
    char operator;
    float num1, num2;

    // Take operator and numbers from the user
    printf("Enter an operator (+, -, *, /): ");
    scanf(" %c", &operator);  // Add a space before %c to ignore any whitespace characters

    printf("Enter first number: ");
    scanf("%f", &num1);