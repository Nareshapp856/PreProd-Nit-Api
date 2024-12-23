#include<stdio.h>
int main()
{
int a,b,c,d;
    scanf(%d%d%d,&a,&b,&c);
    d=(a>b&&a>c)?"printf("max=%d",a)":(b>a&&b>c)?"printf("max=%d",b)":"printf("max=%d",c)"
    printf("%d",d)
}