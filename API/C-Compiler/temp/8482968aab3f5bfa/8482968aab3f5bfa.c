#include<stdio.h>

int main()
{
   int sq, n;
   scanf("%d",&n);
   for(n!=0 ; ;)
   {
    sq=n*n;
    n/=10;
   } 
   if(n==sq%10 || n==sq%100) { 
    printf("%d is an automorphic number.",n);
       }
     else
     {
   printf("%d is not an automorphic number.",n);
      }
   return 0;
}