#include<stdio.h>
int main()
{
    int a, b, c;
    printf("enter the max");
    scanf("%d,%d,%d",&a,&b,&c);
    (a>b&&a>c)? printf("%d is mmax",a):(b>a&&b>c)?printf  
    ("%d is max",b):printf("%d is max",c);
    return 0:
}