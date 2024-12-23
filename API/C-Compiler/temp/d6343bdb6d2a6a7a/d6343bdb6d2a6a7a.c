#include<stdio.h>
int main()
{
    int num;
    scanf("%d",&num);
    num%2==0? printf("%d",even):num%2!=0?printf("%d",odd);
}