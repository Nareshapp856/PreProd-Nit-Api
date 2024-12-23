#include<stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    for(m=n;m!=0;m=m/10){
        c++;
    }
    m=n;
    if(c==1){
        if(n*n%10==n){
        printf("%d is an automorphic number.",n);
    }
    else printf("%d is not an automorphic number.",n);
    }
    else if(c==2){
        if(n*n%100==n){
        printf("%d is an automorphic number.",n);
    }
    else printf("%d is an automorphic number.",n);
    }
    else printf("%d is an automorphic number.",n);
    return 0;
}