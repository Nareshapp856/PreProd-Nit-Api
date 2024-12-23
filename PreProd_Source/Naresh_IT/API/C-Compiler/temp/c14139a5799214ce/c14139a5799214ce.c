#include<stdio.h>
int main() {
    int da#include <iostream>
using namespace std;

int main() {
    int dayNumber;
    cout << "Enter a number (1-7): ";
    cin >> dayNumber;

    switch (dayNumber) {
        case 1:
            cout << "Monday" << " (Valid)" << endl;
            break;
        case 2:
            cout << "Tuesday" << " (Valid)" << endl;
            break;
        case 3:
            cout << "Wednesday" << " (Valid)" << endl;
            break;
        case 4:
            cout << "Thursday" << " (Valid)" << endl;
            break;
        case 5:
            cout << "Friday" << " (Valid)" << endl;
            break;
        case 6:
            cout << "Saturday" << " (Valid)" << endl;
            break;
        case 7:
            cout << "Sunday" << " (Valid)" << endl;
            break;
        default:
            cout << "Invalid day number. Enter a number between 1 and 7." << endl;
    }

    return 0;
}
