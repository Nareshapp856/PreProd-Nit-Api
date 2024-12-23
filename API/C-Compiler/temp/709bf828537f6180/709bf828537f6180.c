#include<stdio.h>
int main()
{
    int a,week;
    printf("Enter a number");
    scanf("%d",a);
  if(a<=7)
  {
    switch(a<=7)
    {
        case 1:
        printf("Monday");
        break;
        case 2:
         printf("Tuesday");
          break;
        case 3:
         printf("Wednesday");
          break;
        case 4:
         printf("Thursday");
          break;
        case 5:
         printf("Friday");
          break;
        case 6:
         printf("Saturday");
          break;
        case 7:
         printf("Sunday");
        break;
        default:
         printf("Invalid day number. Enter a number between 1 and 7." );
    }
    else
    {
        printf("Invalid day number. Enter a number between 1 and 7.");
    }

  }
}
