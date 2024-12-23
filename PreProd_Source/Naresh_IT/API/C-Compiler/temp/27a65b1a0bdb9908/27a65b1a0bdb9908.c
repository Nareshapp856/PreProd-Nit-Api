#include<stdio.h>
int main()
{
    int a,b,c,d;
    scanf("%d\n",&a);
    b=a/100;
    c=a%100;
    d=(c<=50)?b*100:(c>50)?(++b*100):invalid;
    printf("Previous multiple: %d\n",d);
    printf("Next multiple: %d",d);
return 0;
}