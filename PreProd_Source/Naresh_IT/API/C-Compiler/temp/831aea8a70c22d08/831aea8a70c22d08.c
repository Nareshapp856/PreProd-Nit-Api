#include<stdio.h>
int main(){
    int n,temp,r,pow=1,c=0,i;
    //printf("enter a number");
    scanf("%d",&n);
    temp=n;
    while(temp!=0){
      c++;
      temp=temp/10;
    }
    temp=n;
    while(temp!=0){
        r=temp%10;
        for(i=1;i<=c;i++){
            pow=pow*r;
        }
        sum=sum+pow;

    }if(sum==n)printf("%d is an Armstrong number",n);
    return 0;
}