#include<stdio.h>
int main()
{
    int a,b,c;
    scanf("%d\n,%d\n,%d\n",a,b,c);
    (a>b&&a>c)?
    printf("%d",a):(b>a&&b>c)?
    printf("%d",b):ptintf("%d",c);
    return 0;
    }