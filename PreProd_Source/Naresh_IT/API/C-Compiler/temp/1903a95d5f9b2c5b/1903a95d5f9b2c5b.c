#include<stdio.h>
int main(){
    int a,b,c;
    scanf("%d %d %d ",&a,&b,&c);

   a>b && a>c && printf("MAX = %d",a)||
   a<b && c<b && printf("MAX = %d",b)||
   c>b && a<c && printf("MAX = %d",c);

   return 0



}