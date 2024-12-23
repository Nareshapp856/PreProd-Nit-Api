#include<stdio.h>
int main(){
    int ,number;
    
    scanf("%d",&number);
    switch(number){
        case 1:printf("Monday",number);break;
        case 2:printf("Tuesday",number);break;
        case 3:printf("Wednesday",number);break;
        case 4:printf("Thursday",number);break;
        case 5:printf("Friday",number);break;
        case 6:printf("Saturday",number);break;
        case 7:printf("Sunday",number);break;
        default:printf("Invalid input! Please enter a number between 1 and 7");
    }
    return 0;
}