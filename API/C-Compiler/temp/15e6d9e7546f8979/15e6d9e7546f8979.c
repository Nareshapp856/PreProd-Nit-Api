#include<stdio.h>
int main(){
    int sub1;
    int sub2;
    int sub3;
    int sub4;
    int sub5;
    total marks = sub1+sub2+sub3+sub4+sub5;
    percentage = (total marks/500)/100;
     
    if(percentage>90 && percentage<100){
        printf("Grade A");
    }
    else if(percentage>75 && percentage<89){
        printf("Grade B");
    }
    else if(percentage>50 && percentage<74){
        printf("Grade C");
    }
    else if(percentage>35 && percentage<49){
        printf("Grade D");
    }
    else if(percentage <35){
        printf("Fail");
    }

    return 0;
}