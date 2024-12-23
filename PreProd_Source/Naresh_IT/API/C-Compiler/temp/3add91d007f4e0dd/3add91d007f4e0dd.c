#include<stdio.h>
int main()
{
int a,b,c,d;
    scanf(%d%d%d,&a,&b,&c);
    d=(a>b&&a>c)?"a is max":(b>a&&b>c)?"b is max":"c is max"
    printf("max=%d",d)
}