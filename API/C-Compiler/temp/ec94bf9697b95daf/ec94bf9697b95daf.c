#include<stdio.h>
int main()
{
    int a,b,c;
    printf("enterTheNumber");
    scanf("%d %d %d",&a,&b,&c);
    int a>b&&a>c printf("a is MAX");
    int b>c&&b>a printf("b is MAX");
    int c>a&&c>b printf("c is MAX");
    return 0;
}