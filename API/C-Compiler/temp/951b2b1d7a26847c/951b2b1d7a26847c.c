#include<stdio.h>
int main()
{
    int n,P,N;

    while(n>0||n<0)
    {
    prinf("Enter a Number ");
    scanf("%d",&n);
    if(n>0)
    {  
        P++;
    }
    else
    {
    N--;
    }
    }
    printf("Positive numbers: %d",P);
     printf("Negative numbers: : %d",N);
}