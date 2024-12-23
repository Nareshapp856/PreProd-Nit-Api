#include<stdio.h>
#include<math.h>
int main()
{
    int count=0,sum=0,m,rem;
    long n;
    scanf("%ld",&n);
    m=n;
    for(;m!=0;m/=10)
    {
        count++;
    }
    for(;count!=0;count--,m=/10)
    {
        rem=m%10;
        sum=sum+pow(rem,count);
    }
    printf(n==sum?"Armstrong":"Not Armstrong");
 return 0;
