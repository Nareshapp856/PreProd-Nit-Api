#include<stdio.h>

int main()
{
   int sq, n;
   scanf("%d",&n);
   for( ; ;)
   {
    sq=n*n;
    n/=10;
   } 
   if(n==sq%10) { 
    printf("%d is an automorphic number.",n);
       }
     else
     {
   printf(" %d is not an automorphic number."n);
      }
   return 0;
}