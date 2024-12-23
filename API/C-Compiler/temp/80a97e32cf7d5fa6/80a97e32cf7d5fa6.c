#include<stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    if(n*n%10==n){
        printf("%d is an automorphic number.",n);
    }
    else printf("%d is not an automorphic number.",n);
    else if(n*n%100==n){
        printf("%d is an automorphic number.",n);
    }
    printf("%d is an automorphic number.",n);
    return 0;
}