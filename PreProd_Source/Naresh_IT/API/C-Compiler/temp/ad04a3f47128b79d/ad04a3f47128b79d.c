#include<stdio.h>
int main(){
    int n,square=n*n,temp;
    scanf("%d",&n);
    int i=n;
    while(n!=0){
        temp=square%10;
        temp/=10;
    }
    if(temp==n){
        printf("%d is an automorphic number",n);
    }else{
        printf("%d is not an automorphic number",n);
    }return 0;
}