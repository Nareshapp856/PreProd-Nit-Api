#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    switch(n){
        case 1:printf("Monday");break;
        case 2:printf("Tuesday");break;
        case 3:printf("wednesday");break;
        case 4:printf("thurday");break;
        case 5:printf("friday");break;
        case 6:printf("studay");break;
        case 7:printf("sunday");break;
        defalut :printf("Invalid input! Please enter a number between 1 and 7.");break
    }
}