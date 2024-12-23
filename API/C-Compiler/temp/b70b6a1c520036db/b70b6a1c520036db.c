#include<stdio.h>
int main(){
    int a;
    int b;
    int c;
    printf("Enter Three number")
    scanf("%d %d %d",&a,&b,&c);
    (a>b&&a>c)?printf("MAX=%d"):(b>a&&b>c)?printf("MAX=%d"):(c>a&&c>b)?printf("MAX=%d"):printf("none");
}