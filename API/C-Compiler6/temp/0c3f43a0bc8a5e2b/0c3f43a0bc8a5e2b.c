#include<stdio.h>
int asum(int a[]){
    int i,s=0,n=5;
    for(i=0;i<=n;i++){
        s+=a[i];
    }
}
int main(){
    int result,a[100];
    result=asum(a[]);
    printf("%d",result);
    return 0;
}