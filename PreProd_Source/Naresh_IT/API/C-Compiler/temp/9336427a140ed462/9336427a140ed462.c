#include<stdio.h>
int main(){
    int n;

    scanf("%d",&n);

    switch(n){
        case 1: 
            printf("Monday");
            break;
            case 2: 
            printf("Tuseday");
            break;
            case 3: 
            printf("Wed");
            break;
            case 4: 
            printf("Thus");
            break;
            case 5: 
            printf("Fri");
            break;
            case 6: 
            printf("sut");
            break;
            case 7: 
            printf("sun");
            break;
            defult:
            printf(""Invalid day number. Enter a number between 1 and 7." (Invalid)");

    }
}