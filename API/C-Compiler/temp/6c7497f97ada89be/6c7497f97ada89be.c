#include<stdio.h>
int main()
{
    int a,b,operator;
    
    scanf("%c",&operator);
    
    scanf("%f",&a);
    
    scanf("%f",&b);
    if(operator=='+')?(printf("Addition is: %.2f",a+b)):        
    (operator=='-')?(printf("Subtraction is: %.2f",a-b)):   
    (operator=='*')?(printf("Multiplication: %.2f",a*b)): 
    (operator=='/')?(printf("Division is: %.2f",a/b))    
    :Invalid Operator
return 0;

}