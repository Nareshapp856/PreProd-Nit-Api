#include<stdio.h>
int main(){
    int a,b,c;
    scanf("%a",&a);
    scanf("%b",&b);
    scanf("%c",&c);
    max=a*(a>b)?a:b && b*(b>c)?b:c &&c*(c>b)?c:b;
    printf("%d",max);
retur 0;
}