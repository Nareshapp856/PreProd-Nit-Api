#include<stdio.h>
int main(){
    int a,b,c,max;
    printf("enter 3 numbers");
    scanf("%d%d%d",a,b,c);
    max = a>b(a>c?a:c):(b>a(b>c?b:c));
    printf("%d",max);
    return 0;
}