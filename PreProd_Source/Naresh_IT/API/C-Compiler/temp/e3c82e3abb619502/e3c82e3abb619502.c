#include<stdio.h>
int main()
{
    int n;
    scanf("%d",n);
    n>99&&n<=1000&&printf("Previous multiple :%d%d",n/100*100,(n/100+1)*100):printf("invalid input");
    return 0;
}