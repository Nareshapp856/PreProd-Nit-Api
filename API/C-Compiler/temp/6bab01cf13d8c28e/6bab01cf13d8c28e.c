#include<stdio.h>
int main()
{
    int day;
    scanf("%d",&day);
    switch(day)
    {
        case 1: printf("Monday");break;
         case 2: printf("Tuesday");break;
          case 3: printf("Wednesday");break;
           case 4: printf("Thrusday");break;
            case 5: printf("Friday");break;
         case 6: printf("Saturday");break;
          case 7: printf("Sundayday");break;
           default : printf(""Invalid day number. Enter a number between 1 and 7.");break;
    }
}