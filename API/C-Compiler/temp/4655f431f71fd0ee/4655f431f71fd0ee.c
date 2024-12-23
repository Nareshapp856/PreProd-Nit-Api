#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    n%2==0? printf("%d",even):n%2!=0? printf("%d",odd);
}