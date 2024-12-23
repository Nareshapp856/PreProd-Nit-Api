#include<stdio.h> 
int main(){ 
    int n; 
    scanf("%d",&n); 
    switch(n){ 
        case 1:pintf("Monday"); 
        break; 
        case 2:printf("Tuesday"); 
        break; 
        case 3:printf("Wednesday") ; 
        break ;
        case 4:printf("Thrusday"); 
        break; 
        case 5:printf("Friday");
        break; 
        case 6:printf("Saturday"); 
        break;
        case 7:printf("sunday"); 
        break; 
        default:printf("Invalid day number. Enter a number between 1 and 7");

    }
}