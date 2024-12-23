#include<stdio.h>
int main(){
    int n,pCount=0,nCount=0;
    while(n>0)
    {
        printf("Enter a number:");
        scanf("%d",&n);
        if(n==0)
        {
            break;
        }
        if(n>0){
            pCOunt++;
            printf("Positive numbers:%d",pCount);
        }
        else if(n<0){
            nCount++;
            printf("Negative numbers:%d",nCount);
        }
    }
}