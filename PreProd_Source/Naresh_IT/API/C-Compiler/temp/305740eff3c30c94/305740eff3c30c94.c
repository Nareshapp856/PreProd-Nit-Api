#include<stdio.h>
int main()
{
    int n;
    scanf("%d",&n);
    int r=n/100;
    int m=(n/10)%10;
   m>5&&printf("%d\n %d",r*100,(r+1)*100)
   m<5&&printf("%d\n %d",r*100,(r+1)*100);
    return 0;

}