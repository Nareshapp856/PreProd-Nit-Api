#include<stdio.h>
int main(){
    int n;
    scanf("%d"&n);
    while(n>0){ 
        if(n>0)
        printf("Positive numbers:%d",n);
        else
        printf("Negative numbers:%d",n);
    }
    return 0;
}