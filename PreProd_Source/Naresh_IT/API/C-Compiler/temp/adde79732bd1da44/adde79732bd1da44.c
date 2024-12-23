#include<stdio.h>

int main(){
    int n,c=0;
    for(i;i>=n;i++){
        printf("Enter a number:");
        scanf("%d",&n);
        if(n==0){
            break;
        }
        if(n%2==0){
            c++;
            printf("Positive numbers:%d",c);
        }
        else if(n%2!=0){
            c++;
            printf("Negative numbers:%d",c);
        }
    }
    return 0;
}