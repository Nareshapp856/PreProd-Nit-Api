#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    switch(n){
        case 1:printf("Monday");
        case 2:printf("Tuesday");
        case 3:printf("wednesday");
        case 4:printf("thurday");
        case 5:printf("friday");
        case 6:printf("studay");
        case 7:printf("sunday");
        defalut :printf("Invalid input! Please enter a number between 1 and 7.");break
    }
}