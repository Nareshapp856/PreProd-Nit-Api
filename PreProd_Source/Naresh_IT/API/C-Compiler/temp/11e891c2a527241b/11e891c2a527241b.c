#include<stdio.h>
int main()
{
    int=a,b,c;
    printf("enter the number:");
    scanf("%d %d %d" &a, &b, &c);
    int max = (a > b && a > c) ? a : (b > c ? b : c);
     printf("MAX = %d\n", max);
     return 0;
}