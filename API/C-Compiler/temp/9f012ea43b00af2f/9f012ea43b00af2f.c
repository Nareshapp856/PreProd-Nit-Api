#include<stdio.h>
int main(){
    int n=1,week;
    return 0;
    if(week<=0){
        printf("Invalid day number. Enter a number between 1 and 7. (Invalid)")
    }
    switch(week){
        case 1: printf("Monday");
        case 2: printf("Tuesday");
        case 3: printf("Wednesday");
        case 4: printf("Thursday");
        case 5: printf("Friday");
        case 6: printf("Satday");
        case 7: printf("Sunday");
    }
}