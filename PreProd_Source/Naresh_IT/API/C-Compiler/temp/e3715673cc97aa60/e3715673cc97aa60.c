#include<stdio.h>
int main()
{
    int a,b,;
    char=oper;
    
    scanf("%c",&oper);
    
    scanf("%f",&a);
    
    scanf("%f",&b);
    if(oper=='+')
    {
        printf("Addition is: %.2f",a+b);
    }
    if else(oper=='-')
    {
        printf("Subtraction is: %.2f",a-b);
    }      
    if else(oper=='*')
    {
        printf("Multiplication: %.2f",a*b);
    }
    if else(oper=='/')
    {
        printf("Division is: %.2f",a/b);
    }
    else
    {
        printf("Invalid Operator");
    }
    
    return 0;

}