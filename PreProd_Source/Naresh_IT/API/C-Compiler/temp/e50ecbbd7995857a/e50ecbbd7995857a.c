#include<stdio.h>
int main(){
    int n;
    printf("Enter a no:\n");
    scanf("%d",&n);
    if(n%2==0){
        printf("Even no");
        es=es+n;
    }
    printf("Sum of even numbers: %d",es);
    return 0;
}