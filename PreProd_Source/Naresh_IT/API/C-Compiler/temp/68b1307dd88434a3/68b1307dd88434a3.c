#include<stdio.h>
int main()
{
    int a, b, c;
    scanf("%d %d %d\n", &a, &b, &c);
    (a>b)?printf("a is big"):(b>a)?printf("b is big"):
    (c>a)?printf("c is big")

    return 0;
}