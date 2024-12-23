#include<stdio.h>
int main()
{
    int sub1,sub2,sub3,sub4,sub5,sum,marks,percentage;
    int Total marks=100;
   // printf("sub1:");
    scanf("%d",sub1);
    scanf("%d",sub2);
    scanf("%d",sub3);
    scanf("%d",sub4);
    scanf("%d",sub5);
    if(marks>=100)
    {
        printf("Grade A");
    }
    else if(marks>=89)
    {
        printf("Grade B");
    }
    else if(marks>=74)
    {
        printf("Grade C");
    }
    else if(marks>=49)
    {
        printf("Grade D");
    }
    else if( marks>35)
    {
        printf("fail");
    }
    else{
        printf("invalied marks you are entered");
    }
printf(sum=sub1+sub2+sub3+sub4+sub5);
printf(percentage=sum/100*total marks);
return 0;
}