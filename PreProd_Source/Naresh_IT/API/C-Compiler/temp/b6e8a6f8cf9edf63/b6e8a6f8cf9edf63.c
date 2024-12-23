#include<stdio.h>
int main()
{
    int n,c=0,i,d=1;
    scanf("%d",&n);
    m=n;
    while(m!=0)
    {
       m/=10;
       c++; 
    }
    for(i=i;i<=c;i++)
    {
        d=d*10;
    }
    if(n*n%d==n)printf("%d is an automorphic number.");
    else printf("%d is not an automorphic number.");
}