#include<stdio.h>
int main()
{
    int a,b,c;
    
    scanf("%d%d%d,a,b,c");
    d=a>b&&a<c?"a is max":b>c&&b>a?"b is max":"c is max";
    printf("%d",d);
}