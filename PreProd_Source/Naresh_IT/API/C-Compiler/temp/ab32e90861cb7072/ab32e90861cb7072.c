#include<stdio.h>
int main(){
    int MAX;
    int a;
    int b;
    int c;
    printf("Enter Three number");
    scanf("%d %d %d",&a,&b,&c);
    if((a<b)&&(c<b))
    printf("MAX = %d",b);
    else if((b<c)&&(a<c))
    printf("MAX = %d",c);
    else
    printf("MAX = %d",a);
return
}