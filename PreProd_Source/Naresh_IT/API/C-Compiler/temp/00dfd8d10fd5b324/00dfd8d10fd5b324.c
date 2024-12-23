#include<stdio.h>

int main()
{
   int num;
   scanf("%d", &num);


   switch(num)
   {

    case 1: printf("Monday");
    break;

      case 3: printf("Wednesday");
    break;

  case 6: printf("Saturday");
    break;

  case 7: printf("Sunday");
    break;

default: printf("Invalid input! Please enter a number between 1 and 7.")
break;
   }
    return 0;
}