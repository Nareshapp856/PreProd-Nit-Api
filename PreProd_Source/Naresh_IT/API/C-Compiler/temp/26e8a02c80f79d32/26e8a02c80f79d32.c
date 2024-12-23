#include<stdio.h>
int main()
{
    int s1,s2,s3,s4,s5, sum, per;
    scanf("%d%d%d%d%d",&s1,&s2,&s3,&s4,&s5);
    if(s1<=100&&s2<=100&&s3<=100&&s4<=100&&s5<=100){
    if(s1>=35&&s2>=35&&s3>=35&&s4>=35&&s5>=35){
        sum=s1+s2+s3+s4+s5;
         per=sum*100/500;
        printf("Total Marks:%d\n",sum);
        printf("Percentage: %.2f\n",per);
        
            if(per>=90&&per<=100)
            printf("Grade: A");
            
            if(per>=75&&per<=89)
            printf("Grade: B");
            
           if(per>=50&&per<=74)
            printf("Grade: C");
            
          if(per>=35&&per<=49)
            printf("Grade: D");
            
            else
            printf("Fail");
            
        }
    }
    else{
        printf("Fail");
    }
    }
    else{
        printf("Invalid input. Marks for each subject must be between 0 and 100.");
    }
    }
