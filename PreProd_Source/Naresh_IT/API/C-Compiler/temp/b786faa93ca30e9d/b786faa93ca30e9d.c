#include<stdio.h>
int main()
{
    int a,b,c;
    scanf("%d%d%d",&a,&b,&c);
    printf(a>b?"a is max":b>a?"b is max":c>b?"c is max");
    return 0;
}