#include<stdio.h>
int main()
{
    int a,b,c;
    scanf("%d%d%d",&a,&b,&c);
    a>b?printf("a"):b>c?printf("b"):c>a?printf("c");
}