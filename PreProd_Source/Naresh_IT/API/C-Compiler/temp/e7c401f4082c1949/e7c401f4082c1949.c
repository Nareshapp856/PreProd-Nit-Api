#include<stdio.h>
int main(){
    int sub1 = 95,sub2= 89 ,sub3 =88 ,sub4=92,sub5=91,marks=35;
    scanf("%d%d%d%d%d",&sub1,&sub2,&sub3,&sub4,&sub5);

   int  total = sub1+sub2+sub3+sub4+sub5;
   int avg = total/5;

   while(marks>=35 && marks 35 <= 100) {
    switch(avg/10){
        case 10:
        case 9 :
           printf("Grade A:");
           break;
        case 8 : 
       // case 7.5 :
           printf("%d -100 Grade A:");
           break; 
        //case 7 : 
        case 7:
        case 6:
        case 5:
           printf("Grade C");
           break;
       // case 4.9 :
        case 4 :
       // case 3.5 :    
        break:
        default : printf("fail");
        break;
    } 
    printf("invalid input :");
   }
    return 0;
}