#include<stdio.h>
#include<conio.h>
main()
{
    int a,b;
    printf("Enter a");
    scanf("%d",a);
    printf("Enter b:");
    scanf("%d",&b);
    ((a>b)&& printf("b is max"));
    ||((a>b)&& printf("a is max"));
    return 0;
}