#include<stdio.h>

int main(){
    int n,i,c=0;
    for(i;i<=n;i++){
        /*printf("Enter a number:");*/
        scanf("%d",&n);
        if(n==0){
            break;
        }
        while(n>0){
            printf("Positive numbers:%d",c++);
            n++;
            
        }
        else if(n<0){
            printf("Negative numbers:%d",c++);
            n++;
            
        }
    }
    return 0;
}