#include<stdio.h>
int main(){
    int n,es=0;
    printf("Enter a no:\n");
    scanf("%d",&n);
    for(i=n;i<=n;i++){
    if(n%2==0){
        printf("Even no");
        es=es+n;
    }
    }
    printf("Sum of even numbers: %d",es);
    return 0;
}