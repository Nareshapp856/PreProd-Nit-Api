#include<stdio.h>
int main(){
    int sub1,sub2,sub3,sub4,sub5,sum,per;
    scanf(%d%d%d%d%d,&sub1,&sub1,&sub3,&sub4,&sub5);
    sum=sub1+sub2+sub3+sub4+sub5;
    avg=sum/6
    per=avg*100;
    printf("Total Marks:%d",sum);
    printf("Percentage:%d",per);
    if("per<=90")
    printf("Grade A");
    else if("per<=80")
    printf("Grade B");
     else if("per<=70")
    printf("Grade C");
    else if("per<=35")
    printf("Grade D");
    else
    printf("Fail");
}