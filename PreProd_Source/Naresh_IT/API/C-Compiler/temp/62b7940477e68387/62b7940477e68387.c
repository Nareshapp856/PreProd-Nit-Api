#include<stdio.h>
int main(){

    int sub1,sub2,sub3,sub4,sub5,tot;
    float av;

    //printf("Enter A Five Subjects Marks :");
    scanf("%d",&sub1);
    scanf("%d",&sub2);
    scanf("%d",&sub3);
    scanf("%d",&sub4);
    scanf("%d",&sub5);
    tot=sub1+sub2+sub3+sub4+sub5;
    per=(tot)/5;
    int per=tot/10;
    printf("Total Marks: %d",tot);
    printf("Percentage: %.2f%%",av);
    switch(per)
    {
        // case 90:
        // case 91:
        // case 92:
        // case 93:
        // case 94:
        // case 95:
        // case 96:
        // case 97:
        // case 98:
        // case 99:
        // case 100:

        case 9:
          printf("Grade: A");
        break;

        case 6:
        printf("Grade: B");
        break;

        case 50 ... 74:
        printf("Grade: C");
        break;

        case 35 ... 49:
        printf("Grade: D");
        break;

        default:
        printf("Fail");

    }


}