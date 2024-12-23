#include<stdio.h>
int main()
{
    int s1,s2,s3,s4,s5;
    float marks,percentage;
    char grade;
    scanf("%d",&s1);
    scanf("%d",&s2);
    scanf("%d",&s3);
    scanf("%d",&s4);
    scanf("%d",&s5);
    marks=s1+s2+s3+s4+s5;
    percentage=marks/500*100;
    if(marks<35)
    {
        printf("Fail");
    }
    else if(percentage> 90 && percentage<100);
    {
        printf("Grade: A");
    }
    else if(percentage> 75 && percentage<89);
    {
        printf("Grade B");
    }
    else if(percentage> 50 && percentage<74);
    {
        printf("Grade C")
    }
    else if(percentage> 35 && percentage<49);
    {
        printf("Grade D");
    }
    else{
        printf("Fail");
    }
    printf("Total Marks:%d",marks);
    printf("Percentage:%2f\n",percentage);
}