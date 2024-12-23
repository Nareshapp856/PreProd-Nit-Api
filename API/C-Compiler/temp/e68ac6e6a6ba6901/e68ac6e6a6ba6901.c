#include<stdio.h>
int main()
{
    int a,b,c;
    printf("enterTheNumber");
    scanf("%d %d %d",&a,&b,&c);
    a>b&&a>c printf("a is big");
    b>c&&b>a printf("b is big");
    c>a&&c>b printf("c is big");
}