#include<stdio.h>
int main(){
    int sub1=95,sub2=80,sub3=88,sub4=92,sub5=91,marks=35;
    
    int total = sub1+sub2+sub3+sub4+sub5;
    float avg = total/5;

    while(marks>= 35 && marks<=100){
        switch(avg/10){
        case 10:
        case 9:
           printf("total marks = %d\n parcentage % = %d%\nGrade A",total,(float)avg);
           break;
        case 8:
       
           printf("total marks = %d\n parcentage% = %.2f%\nGrade B",total,avg);
           break;
       
        case 7:
        case 6:
        case 5:
           printf("total marks = %d\n parcentage= %.2f%\nGrade C",total,avg);
           break;
        case 4:
        case 3:
           printf("total marks = %d\n parcentage %= %d%\nGrade D",total,avg)  ;
           break;
        default:  printf("fail");
        break;


        }
       
       return 0;
    }
    return 0;
}