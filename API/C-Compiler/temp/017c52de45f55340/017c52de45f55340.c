#include<stdio.h>
int main()
{
    int n;
    scanf("%d",n);
    n>99&&n<=1000?printf("previous multiple :%d/n next multiple : %d",(n/100)*100,((n/100)+1)*100);
    n<99&&n<0?printf("invalid output"):printf("invalid output");
    return 0;
}