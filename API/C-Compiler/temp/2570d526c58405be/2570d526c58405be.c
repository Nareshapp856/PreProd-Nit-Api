#include<stdio.h>
int main()
{
    int n;
    //printf("Enter a number(1-7)");
    scanf("%d",&n);

    switch(n)
    {
        case 1:
        printf("Monday");
        break;
        case 2:
        printf("Tuesdat");
        break;
        case 3:
        printf("Wednesday");
        break;
        case 4:
        printf("Thurday");
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
        printf("Invalid day number. Enter a number between 1 and 7.") (Invalid)
    }
}