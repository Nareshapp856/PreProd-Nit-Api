#include<stdio.h>
int main(){

    int number;
    scanf("%d", &number);
    int poscount = 0
    int negcount = 0;

    for(int i = 0; i < number.length; i++){
        if(number > 0){
            poscount++;
        }else{
            negcount++;
        }
    }

    printf("Positive numbers: %d", poscount);
    printf("Positive numbers: %d", negcount);

}