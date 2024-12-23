#include <stdio.h>
int main()
{
    int n;
    printf("enter the number");
    scanf("%d",&n);
    sum=0;
    num=0;
    while(num!=0){
        sum=sum+^(num%10,3);
        num=num/10;
    }
    if(sum==num){
        printf("it is armstrong number");
    }
    else{
        printf("it is not armstrong number");
    }
}