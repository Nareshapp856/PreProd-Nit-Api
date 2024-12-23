#include<stdio.h>
int main()
{
    int n,sq,temp,r;
    scanf("%d",&n);
    temp=n;
    sq=n*n;
    while(n!=0)
    {
        r=n%10;
        sq%=10;
        n=n/10;
    }
    if(sq==r)
    printf("%d is an automorphic number.",n);
    else
    printf("%d is not an automorphic number.")
}