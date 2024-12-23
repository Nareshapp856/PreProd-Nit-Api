#include<stdio.h>
int main()
{
    int a,b,operator;
    printf("enter a operator(+,-,*,/):");
    scanf("%c",&operator);
    printf("Enter first number :");
    scanf("%f",&a);
    printf("Enter second number :");
    scanf("%f",&b);
    if(operator=='+')?printf("Addition is %.2f:",a+b):(operator==-'-')?printf("Subtraction is %.2f:",a-b):(operator=='*')?printf("multiplication:%.2f",a*b):(operator=='/'')?printf("Division is:%.2f",a/b):Invalid Operator
return 0;

}