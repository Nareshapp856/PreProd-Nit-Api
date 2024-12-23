#include<stdio.h>
int main(){
    int n,m,pro=1,arm;
    scanf("%d",&n);m=n;
    while(n!=0){
         r=n%10;
         pro=r*r;
         arm+=pro;
         n=n/10;
    };
    if(arm==m)printf("%d is an Armstrong number",m);
    else printf("%d is not an Armstrong number",m);
}