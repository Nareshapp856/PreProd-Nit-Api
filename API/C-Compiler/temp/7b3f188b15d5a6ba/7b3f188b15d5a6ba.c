#include<stdio.h>
int main()
{
    int a,b,c;
    scanf("%d\n,%d\n,%d\n",a,b,c);
    (a>b&&a>c?
    printf("%d,a is big"):(b>a&&b>c)?
    printf("%d,b is big"):ptintf("%d,c is big");
    return 0;
    }