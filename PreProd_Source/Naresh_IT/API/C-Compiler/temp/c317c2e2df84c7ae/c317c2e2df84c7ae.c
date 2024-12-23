#include<stdio.h>
int main()
{
    int n,i,c=0;
    scanf("%d",&n);
    for(i=2,i<n,i++)
    {
        if(n%i==0)
        c++;
        
    }
    if(c==2)
    printf("%d is a prime number.")
    else
    printf("%d is not a prime number.")
}