#include<stdio.h>
int main(){
    int a;
    scanf("%d",&a);
    a%2==0 && printf("%d is Even",a); || printf("%d is Odd",a);
    return 0;
}