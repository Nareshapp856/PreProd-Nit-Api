#include <stdio.h>
int main() {
 int n,m,s=1;
 int count=0;
 printf("Enter n:");
 scanf("%d",&n);
 
 m=n*n;
 
 for(; n!=0; n=n/10)
 { 
 if(n%10!=m%10)
 {
 s=0;
 printf("Not Automorphic");
 break;
 }
 m=m/10;
 }
 
 if(s==1)
  printf("Automorphic number");
 //printf("%d",count);
 return 0;