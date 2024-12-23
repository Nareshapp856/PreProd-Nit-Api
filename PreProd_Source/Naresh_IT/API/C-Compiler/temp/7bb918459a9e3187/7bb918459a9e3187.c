#include<stdio.h>
int main()
{
    int n,i;
    scanf("%d",&n);
    for(i=2,c=0;i<n;i++)
    {
        if(n%i==0)
        c++;
        
    }
    if(c==2)
    printf("7 is a prime number.")
}