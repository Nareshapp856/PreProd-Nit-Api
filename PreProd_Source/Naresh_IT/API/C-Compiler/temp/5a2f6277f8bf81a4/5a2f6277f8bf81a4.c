#include<stdio.h>
int main(){
int s1,s1,s3,s4,s4;float per,avg;
scanf("%d%d%d%d%d",&s1,&s2,&s3,&s4,&s5);
if(s1>=100 && s2>=100 && s3>=100 && s4>=100 && s5>=100){
    int sum=s1+s2+s3+s4+s5;
    int avg=(float)sum/5;
    if(avg>=90 && avg<=100){
        printf("Total Marks:%d\n",sum);printf("Percentage:%.2f\n",avg);
        printf("Grade:A (Valid)");
    }
    else if(avg>=75 && avg<90){
         printf("Total Marks:%d\n",sum);printf("Percentage:%.2f\n",avg);
        printf("Grade:B (Valid)");
    }
    else if(avg>=50 && avg<75){
         printf("Total Marks:%d\n",sum);printf("Percentage:%.2f\n",avg);
        printf("Grade:C (Valid)");
    }
    else if(avg>=35 && avg<50){
         printf("Total Marks:%d\n",sum);printf("Percentage:%.2f\n",avg);
        printf("Grade:D (Valid)");
    }
    else if(avg>=75 && avg<90){
         printf("Total Marks:%d\n",sum);printf("Percentage:%.2f\n",avg);
        printf("Grade:A (Valid)");
    }
    else if(avg<35)printf("Fail");
}
else printf("Invalid input. Marks for each subject must be between 0 and 100.");
return 0;
}