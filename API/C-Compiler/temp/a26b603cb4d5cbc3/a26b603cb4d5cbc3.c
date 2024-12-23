#include<stdio.h>
int main(){
    int n,es=0;
    // printf("Enter a no:\n");
    scanf("%d",&n);
    scanf("%d",&end);
    for( int i=n;i<=end;i++){
    if(n%2==0){
        // printf("Even no");
        es=es+i;
    }
    }
    printf("Sum of even numbers: %d",es);
    return 0;
}