#include<stdio.h>

int main()
{
   int sq, n;
   scanf("%d",&n);

   for( ; n!=0;)
   {sq=1;
    sq=n*n;
    n/=10;
   } 
    printf("%d is an automorphic number."(n==sq%10));
   
   return 0;
}