#include<stdio.h>
int main(){
    int a,b,c;
    scanf("%d",&a);
    scanf("%d",&b);
    scanf("%d",&c);
    (a>b&&a>c)&&printf("a is big");
    (b>c&&b=c)&&printf("b is big");
    (c>a&&c>b)&&printf("c is big");

    return 0;
}