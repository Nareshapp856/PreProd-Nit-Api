#include<stdio.h>
int main()
{
    int s1,s2,s3,s4,s5,total;
    float percent;
    //printf("Enter s1,s2,s3,s4,s5")
    scanf("%d%d%d%d%d",&s1,&s2,&s3,&s4,&s5);
    if(s1<=100&&s2<=100&&s3<=100&&s4<=100&&s5<=100)
    {
        if(s1>=35&&s2>=35&&s3>=35&&s4>=35&&s5>=35)
        {
                if(percent>=90&&percent<=100)
        {
            total=s1+s2+s3+s4+s5;
        percent=(total/500);
            printf("Total Marks:%d",total);
            printf("Percentage:%2f",percent);
            printf("Grade A");
        }
        else if(percent>=75&&percent<=89)
        {
            total=s1+s2+s3+s4+s5;
        percent=(total/500);
             printf("Total Marks:%d",total);
            printf("Percentage:%2f",percent);
            printf("Grade B");
        }
        else if(percent>=50&&percent<=74)
        {
            total=s1+s2+s3+s4+s5;
        percent=(total/500);
             printf("Total Marks:%d",total);
            printf("Percentage:%2f",percent);
            printf("Grade C");
        }
        else if(percent>=35&&percent<=49)
        {
            total=s1+s2+s3+s4+s5;
        percent=(total/500);
             printf("Total Marks:%d",total);
            printf("Percentage:%2f",percent);
            printf("Grade D");
        }
        }
        else{
            printf("Fail");
        }
    }
    }
    else
     {
        printf("Invalid input. Marks for each subject must be between 0 and 100.");
    }
}