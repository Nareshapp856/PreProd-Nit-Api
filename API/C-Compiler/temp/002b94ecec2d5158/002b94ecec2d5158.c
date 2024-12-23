#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    n<=1000&&n>=100?printf("Previous multiple :%d\n next multiple %d",(n/100)*100),(((n/100)+1*)100):n>0&&n<=1000?printf("invalid output"):printf("invalid output");
    return 0;
}