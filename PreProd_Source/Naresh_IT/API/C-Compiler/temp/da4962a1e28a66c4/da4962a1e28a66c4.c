#include<stdio.h>
int main()
{
    int n(1-7);
    printf("Enter the number(1-7):");
    scanf("%d",&n);
    switch(n(1-7)){
        case 1:printf("Monday");break;
        case 2:printf("Tuesday");break;
        case 3:printf("Wednesday");break;
        case 4:printf("Thursday");break;
        case 5:printf("Friday");break;
        case 6:printf("Saturdy");break;
        case 7:printf("Sunday");break;
        default:printf("Invalid day number.Enter number between 1 and 7.(Invalid)");break;
    }
     return 0;
}