#include<stdio.h>

int main(){

    int s1,s2,s3,s4,s5;
    int total_marks = 0;
    float per = 0.0;

    scanf("%d%d%d%d%d",&s1,&s2,&s3,&s4,&s5);

    if(s1 > 100 || s2 > 100 || s3 > 100 || s4 > 100 || s5 > 100){
        printf("Invalid input. Marks for each subject must be between 0 and 100.");
        return 1;
    }
    else if(s1 < 35 || s2 <  35 || s3 < 35 || s4 < 35 || s5 < 35){
        printf("Fail");
        return 1;
    }
    else{

        total_marks = s1+s2+s3+s4+s5;
        per = total_marks / 5.0;

        printf("Total Marks: %d\n",total_marks);
        printf("Percentage: %.2f/%\n",per);

        switch(per){
            case 90 ... 100:
            printf("Grade: A");
            break;
            case 75 ... 89:
            printf("Grade B");
            break;
            case 50 ... 74:
            printf(" Grade C");
            break;
            case 35 ... 49:
            printf("Grade D");
            break;

            default:
            printf("Fail");
            break;
        }

    }



    return 0;
}