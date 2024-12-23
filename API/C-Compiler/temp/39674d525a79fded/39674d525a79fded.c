#include<stdio.h>
int main{
    int option;
    //printf("enter the day");
    scanf("%d",&option);
    if(option==1||option==7)
    switch(option)
    {
    case 1:
        printf("Monday");break;
    case 2:
        printf("thusday");break;
    case 3:
        printf("Wednesday");break;
    case 4:
        printf("thusday");break;
    case 5:
        printf("friday");break;
    case 6:
        printf("saterday");break;
    case 7:
        printf("sunday");break;
    default:
        printf
("Invalid input! Please enter a number between 1 and 7.");

    }
}