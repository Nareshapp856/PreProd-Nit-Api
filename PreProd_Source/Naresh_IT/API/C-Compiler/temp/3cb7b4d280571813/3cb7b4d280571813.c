#include<stdio.h>
int main()
{
    float a,b;
    char 'c';
    printf("Enter the + for addition or - for substraction\n");
    scanf("%c",&c)
   
    printf("Enter a number\n");
    scanf("%f",&a);
    printf("Enter b value\n");
    scanf("%f",&b);
    switch(c)
    {
      case +: printf("%f",a+b);
      break;
      case -: printf("%f",a-b);
      break;
      default :
      printf("Invalid choice");
    }
}