#include<stdio.h>
int main()
{
    float a,b;
    char 'choice';
    printf("Enter the + for addition or - for substraction\n");
    scanf("%c",&choice)
   
    printf("Enter a number\n");
    scanf("%f",&a);
    printf("Enter b value\n");
    scanf("%f",&b);
    switch(choice)
    {
      case +: a+b;
      break;
      case -: a-b;
      break;
      default :
      printf("Invalid choice");
    }
}