#include<stdio.h>
int main(){
    int number;
    scanf("%d"&number);
    while(number>0){
        if(number>0)
        printf("Positive numbers:%d",number);
        else
        printf("Negative numbers:%d",number);
    }
    return 0;
}